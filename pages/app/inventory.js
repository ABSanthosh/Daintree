import Select from "react-select";
import Sidebar from "../../components/Sidebar/Sidebar";
import { fetchAllWarehouses } from "../../dbService/warehouse.db";
import "../../styles/routes/App/inventory.scss";
import { useState } from "react";
import SkuInput from "../../components/SKU/SkuInput/SkuInput";
import NewSkuInput from "../../components/SKU/NewSkuInput/NewSkuInput";
import FancyButton from "../../components/FancyButton/FancyButton";
import Fetcher from "../../utils/Fetcher";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const warehouses = await fetchAllWarehouses();

  return {
    props: {
      user: context.req.session.user,
      warehouses: JSON.parse(JSON.stringify(warehouses)),
    },
  };
}

export default function Inventory({ user, warehouses }) {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [warehouseProducts, setWarehouseProducts] = useState(null);
  const [tempWarehouseProducts, setTempWarehouseProducts] = useState(null);

  const [newSkuList, setNewSkuList] = useState([]);
  const [updatedSkuList, setUpdatedSkuList] = useState([]);
  const [deleteSkuList, setDeleteSkuList] = useState([]);
  const [onNewSku, setOnNewSku] = useState(false);

  // console.log("newSkuList", tempWarehouseProducts, warehouseProducts);

  return (
    <div className="InventoryPage">
      <div className="InventoryPage__header">
        <h1>Inventory of</h1>
        <Select
          styles={{
            container: (provided) => ({
              ...provided,
              width: "381px",
            }),
          }}
          options={warehouses.map((warehouse) => {
            return { value: warehouse.id, label: warehouse.name };
          })}
          onChange={async (e) => {
            setSelectedWarehouse(e.value);
            await Fetcher("/api/inventory/fetch-products", {
              method: "POST",
              body: { id: e.value },
            }).then((res) => {
              setWarehouseProducts(res.productList);
              setTempWarehouseProducts(res.productList);
            });
          }}
        />
      </div>
      <div className="InventoryPage__body">
        <div className="InventoryPage__left">
          <section className="InventoryPage__SkuBox">
            {selectedWarehouse &&
              tempWarehouseProducts &&
              tempWarehouseProducts
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product, index) => (
                  <SkuInput
                    key={index}
                    sku={{
                      id: product.id,
                      name: product.name,
                      quantity: product.quantity,
                    }}
                    onNewSku={onNewSku}
                    setOnNewSku={setOnNewSku}
                    newSkuList={newSkuList}
                    deleteSkuList={deleteSkuList}
                    updatedSkuList={updatedSkuList}
                    onQuantityChange={(sku) => {
                      setTempWarehouseProducts(
                        tempWarehouseProducts.map((i) => {
                          if (i.id === sku.id) return sku;
                          else return i;
                        })
                      );

                      setUpdatedSkuList((prev) => {
                        const index = prev.findIndex((i) => i.id === sku.id);
                        if (index === -1) return [...prev, sku];
                        else {
                          prev[index] = sku;
                          return [...prev];
                        }
                      });
                    }}
                    onRemove={(sku) => {
                      if (deleteSkuList.find((i) => i.id === sku.id)) {
                        setDeleteSkuList(
                          deleteSkuList.filter((i) => i.id !== sku.id)
                        );
                      } else {
                        setDeleteSkuList((prev) => [...prev, sku]);
                      }
                    }}
                  />
                ))}

            {newSkuList.map((sku, index) => (
              <SkuInput
                key={index}
                sku={sku}
                newSkuList={newSkuList}
                updatedSkuList={updatedSkuList}
                deleteSkuList={deleteSkuList}
                onQuantityChange={(sku) => {
                  setNewSkuList(
                    newSkuList.map((i) => {
                      if (i.id === sku.id) return sku;
                      else return i;
                    })
                  );
                }}
                onRemove={(sku) => {
                  setNewSkuList((prev) => {
                    return prev.filter((i) => i.id !== sku.id);
                  });
                }}
              />
            ))}

            <div className="InventoryPage__addSkuBox">
              {!onNewSku ? (
                <button
                  className="InventoryPage__addSkuBox--addSku"
                  onClick={() => {
                    setOnNewSku(true);
                  }}
                >
                  New SKU
                </button>
              ) : (
                <NewSkuInput
                  setNewSkuList={setNewSkuList}
                  setOnNewSku={setOnNewSku}
                  sku={{
                    quantity: 0,
                    name: "",
                  }}
                />
              )}
            </div>
          </section>
          {(updatedSkuList.length > 0 &&
            JSON.stringify(tempWarehouseProducts) !==
              JSON.stringify(warehouseProducts)) ||
          deleteSkuList.length > 0 ||
          newSkuList.length > 0 ? (
            <section className="InventoryPage__actions">
              <FancyButton
                invertButton
                onClick={() => {
                  setTempWarehouseProducts([...warehouseProducts]);
                  setUpdatedSkuList([]);
                  setDeleteSkuList([]);
                }}
                className="InventoryPage__actions--addSku"
              >
                Cancel
              </FancyButton>
              <FancyButton
                onClick={async () => {
                  if (
                    !confirm(`Are you sure you want to make these changes? \n\nDelete: ${deleteSkuList
                      .map((i) => i.name)
                      .join(", ")}\nUpdate: ${updatedSkuList
                      .map((i) => i.name)
                      .join(", ")}\nNew: ${newSkuList
                      .map((i) => i.name)
                      .join(", ")}
                `)
                  ) {
                    return;
                  }

                  if (updatedSkuList.length > 0) {
                    await Fetcher("/api/inventory/update-item", {
                      method: "POST",
                      body: {
                        id: selectedWarehouse,
                        data: updatedSkuList,
                      },
                    }).then((res) => {
                      if (res.result.length === updatedSkuList.length) {
                        setUpdatedSkuList([]);
                        setWarehouseProducts([...res.productList]);
                        setTempWarehouseProducts([...res.productList]);
                      }
                    });
                  }

                  if (deleteSkuList.length > 0) {
                    await Fetcher("/api/inventory/delete-item", {
                      method: "POST",
                      body: {
                        idList: deleteSkuList.map((i) => i.id),
                        id: selectedWarehouse,
                      },
                    }).then((res) => {
                      if (res.result.count === deleteSkuList.length) {
                        setDeleteSkuList([]);
                        setWarehouseProducts([...res.productList]);
                        setTempWarehouseProducts([...res.productList]);
                      }
                    });
                  }

                  if (newSkuList.length > 0) {
                    console.log(selectedWarehouse);
                    await Fetcher("/api/inventory/add-item", {
                      method: "POST",
                      body: newSkuList.map((i) => {
                        return {
                          data: {
                            name: i.name,
                            quantity: i.quantity,
                            description: "",
                            warehouseId: selectedWarehouse,
                          },
                          id: selectedWarehouse,
                        };
                      }),
                    }).then((res) => {
                      if (res.result.count === newSkuList.length) {
                        setNewSkuList([]);
                        setWarehouseProducts([...res.productList]);
                        setTempWarehouseProducts([...res.productList]);
                      }
                    });
                  }
                }}
                className="InventoryPage__actions--addSku"
              >
                Save Changes
              </FancyButton>
            </section>
          ) : (
            <br />
          )}
        </div>
      </div>
    </div>
  );
}

Inventory.getLayout = function getLayout(page) {
  return (
    <div className="Layout">
      <Sidebar activePage={2} />
      {page}
    </div>
  );
};
