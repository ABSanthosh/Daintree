import "../styles/root/globals.scss";

import { AuthProvider, getUserFromSession } from "../context/authContext";
import App from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps, user }) {
  return (
    <AuthProvider ssrUser={user}>
      <Head>
        <title>Baratie</title>
        <meta name="description" content="Buy Food products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  if (appContext.router.isSsr === undefined) {
    const appProps = await App.getInitialProps(appContext);
    const user = await getUserFromSession(appContext.ctx);
    return { ...appProps, user: user };
  } else {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }
};

export default MyApp;
