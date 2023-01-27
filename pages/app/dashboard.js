import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import "../../styles/routes/Dashboard.scss";
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

export default function Dashboard({ user }) {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <div className="DashboardWrapper">
      {/* <p>Hello, {user.name}</p>
      <button onClick={async () => await logout(router)}>Sign out</button> */}
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <div className="Layout">
      <Sidebar activePage={1} />
      {page}
    </div>
  );
};
