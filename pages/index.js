import "../styles/routes/Home.scss";
import { useRouter } from "next/router";

import useAuth from "../hooks/useAuth";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: { user: context.req.session.user },
  };
}

export default function Home({ user }) {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <div className="HomeWrapper">
      {user === null && (
        <button onClick={async () => await login(router)}>Google Login</button>
      )}
      {user !== null && <a href="/app/dashboard">Open App →</a>}
    </div>
  );
}
