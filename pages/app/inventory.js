import Sidebar from "../../components/Sidebar/Sidebar";

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

export default function Inventory({ user }) {
  return (
    <div className="InventoryWrapper">
      <p>Hello, {user.name}</p>
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
