import { useEffect, useState } from "react";
import MenuPane from "../../components/MenuPane/MenuPane";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../styles/routes/App/warehouse.scss";
import FancyButton from "../../components/FancyButton/FancyButton";
import Countries from "../../utils/countries.json";
import Select from "react-select";
import FancyInput from "../../components/FancyInput/FancyInput";
import Fetcher from "../../utils/Fetcher";
import { fetchAllWarehouses } from "../../dbService/warehouse.db";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const warehouses = await fetchAllWarehouses(context.req.session.user.sub);

  return {
    props: {
      user: context.req.session.user,
      warehouses: JSON.parse(JSON.stringify(warehouses)),
    },
  };
}

export default function WareHouse({ user, warehouses }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(null);
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    country: "",
    maxQuantity: 0,
  });

  const [localWarehouses, setLocalWarehouses] = useState(warehouses);

  return (
    <div className="WareHousePage">
      <div className="WareHousePage__header">
        <h1>Warehouse</h1>
        <ul className="WareHousePage__list">
          <li className="WareHousePage__list--item">
            <button>Overview</button>
          </li>
          <li className="WareHousePage__list--item">
            <button
              onClick={() => {
                setIsAddOpen(!isAddOpen);
              }}
            >
              Add Warehouse
            </button>
          </li>
        </ul>

        <MenuPane isOpen={isAddOpen} setIsOpen={() => setIsAddOpen(!isAddOpen)}>
          <div className="AddWarehouse">
            <h1>Add Warehouse</h1>
            <div className="AddWarehouse__content">
              <div className="AddWarehouse__row">
                <label htmlFor="name">Name</label>
                <FancyInput
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      name: e,
                    })
                  }
                  placeholder="Warehouse Name"
                />
              </div>
              <div className="AddWarehouse__row">
                <label htmlFor="name">Country</label>
                <Select
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                    }),
                  }}
                  options={Countries.map((country) => {
                    return {
                      value: country,
                      label: country.replaceAll("_", " "),
                    };
                  })}
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      country: e.value,
                    })
                  }
                />
              </div>
              <div className="AddWarehouse__row">
                <label htmlFor="maxQuantity">Maximum Quantity</label>
                <FancyInput
                  type="number"
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      maxQuantity: parseInt(e),
                    })
                  }
                  placeholder="Maximum Quantity"
                />
              </div>
            </div>
            <div className="AddWarehouse__bottom">
              <FancyButton
                style={{
                  width: "100%",
                }}
                onClick={async () => {
                  await Fetcher("/api/warehouse/create-warehouse", {
                    method: "POST",
                    body: { ...newWarehouse, userId: user.sub },
                  }).then((res) => {
                    if (res.status === 200) {
                      setIsAddOpen(!isAddOpen);
                      setLocalWarehouses(res.warehouse);
                    }
                  });
                }}
              >
                Add Warehouse
              </FancyButton>
            </div>
          </div>
        </MenuPane>

        <MenuPane
          isOpen={isEditOpen !== null}
          setIsOpen={() => setIsEditOpen(null)}
        >
          <div className="EditWarehouse">
            <h1>Edit Warehouse</h1>
            <div className="EditWarehouse__content">
              <div className="AddWarehouse__row">
                <label htmlFor="name">Name</label>
                <FancyInput
                  value={newWarehouse.name}
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      name: e,
                    })
                  }
                  placeholder="Warehouse Name"
                />
              </div>
              <div className="EditWarehouse__row">
                <label htmlFor="name">Country</label>
                <Select
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                    }),
                  }}
                  defaultValue={{
                    value: newWarehouse.country,
                    label: newWarehouse.country.replaceAll("_", " "),
                  }}
                  options={Countries.map((country) => {
                    return {
                      value: country,
                      label: country.replaceAll("_", " "),
                    };
                  })}
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      country: e.value,
                    })
                  }
                />
              </div>
              <div className="AddWarehouse__row">
                <label htmlFor="maxQuantity">Maximum Quantity</label>
                <FancyInput
                  type="number"
                  value={newWarehouse.maxQuantity}
                  onChange={(e) =>
                    setNewWarehouse({
                      ...newWarehouse,
                      maxQuantity: parseInt(e),
                    })
                  }
                  placeholder="Maximum Quantity"
                />
              </div>
            </div>
            <div className="EditWarehouse__bottom">
              <FancyButton
                style={{
                  width: "100%",
                }}
                onClick={async () => {
                  await Fetcher("/api/warehouse/update-warehouse", {
                    method: "POST",
                    body: { ...newWarehouse, id: isEditOpen, userId: user.sub },
                  }).then((res) => {
                    if (res.status === 200) {
                      setIsEditOpen(null);
                      setLocalWarehouses(res.warehouse);
                    }
                  });
                }}
              >
                Update Warehouse
              </FancyButton>
            </div>
          </div>
        </MenuPane>
      </div>
      <div className="WareHousePage__body">
        {localWarehouses.map((warehouse, index) => {
          return (
            <div className="WareHousePage__body--item" key={index}>
              <h1>{warehouse.name}</h1>
              <p>{warehouse.country.replaceAll("_", " ")}</p>
              <p>Max: {warehouse.maxQuantity}</p>
              <div className="WareHousePage__body--column">
                <FancyButton
                  invertButton
                  style={{
                    height: "30px",
                    width: "100%",
                  }}
                  onClick={async () => {
                    if (
                      confirm("Are you sure you want to delete this warehouse?")
                    ) {
                      await Fetcher("/api/warehouse/delete-warehouse", {
                        method: "POST",
                        body: { id: warehouse.id, userId: user.sub },
                      }).then((res) => {
                        if (res.status === 200) {
                          setLocalWarehouses(res.warehouse);
                        }
                      });
                    }
                  }}
                >
                  Delete
                </FancyButton>
                <FancyButton
                  style={{
                    height: "30px",
                    width: "100%",
                  }}
                  onClick={() => {
                    setIsEditOpen(warehouse.id);
                    setNewWarehouse({
                      name: warehouse.name,
                      country: warehouse.country,
                      maxQuantity: warehouse.maxQuantity,
                    });
                  }}
                >
                  Edit
                </FancyButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

WareHouse.getLayout = function getLayout(page) {
  return (
    <div className="Layout">
      <Sidebar activePage={3} />
      {page}
    </div>
  );
};
