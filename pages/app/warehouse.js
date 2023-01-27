import { useState } from "react";
import MenuPane from "../../components/MenuPane/MenuPane";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../styles/routes/App/warehouse.scss";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: context.req.session.user },
  };
}

export default function WareHouse({ user }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
            <MenuPane
              isOpen={isAddOpen}
              setIsOpen={() => setIsAddOpen(!isAddOpen)}
            >
              <div className="AddWarehouse">
                <h1>Add Warehouse</h1>
              </div>
            </MenuPane>
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
              </div>
            </MenuPane>
          </li>
        </ul>
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
