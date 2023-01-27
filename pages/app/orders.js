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

export default function Orders({ user }) {
  return (
    <div className="OrdersWrapper">
      <p>Hello, {user.name}</p>
    </div>
  );
}

Orders.getLayout = function getLayout(page) {
  return (
    <div className="Layout">
      <Sidebar activePage={4} />
      {page}
    </div>
  );
};
