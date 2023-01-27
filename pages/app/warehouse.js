import { useState } from "react";
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

  const warehouses = await fetchAllWarehouses();

  return {
    props: { user: context.req.session.user, warehouses },
  };
}

export default function WareHouse({ user, warehouses }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
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
          <li className="WareHousePage__list--item">
            <button
              onClick={() => {
                setIsEditOpen(!isEditOpen);
              }}
            >
              Edit Warehouse
            </button>
            <MenuPane
              isOpen={isEditOpen}
              setIsOpen={() => setIsEditOpen(!isEditOpen)}
            >
              <div className="EditWarehouse">
                <h1>Edit Warehouse</h1>
                <div className="EditWarehouse__content"></div>
                <div className="EditWarehouse__bottom"></div>
              </div>
            </MenuPane>
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
      </div>
      <div className="WareHousePage__body">
        {localWarehouses.map((warehouse, index) => {
          return (
            <div className="WareHousePage__body--item" key={index}>
              <h1>{warehouse.name}</h1>
              <p>{warehouse.country}</p>
              <p>{warehouse.maxQuantity}</p>
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
