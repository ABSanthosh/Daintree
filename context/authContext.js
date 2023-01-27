import React from "react";
import { ironOptions } from "../lib/ironOptions";
import { withIronSessionSsr } from "iron-session/next";

export const AuthContext = React.createContext({});

export const getUserFromSession = withIronSessionSsr(async ({ req }) => {
  if (req.session.user === undefined) {
    return null;
  } else {
    const user = req.session.user;
    return user;
  }
}, ironOptions);

export function AuthProvider({ children, ssrUser, ...props }) {
  const [user] = React.useState(ssrUser);

  async function login(router) {
    const res = await fetch("/api/auth/google");
    const data = await res.json();
    router.push(data.Location);
  }

  async function logout(router) {
    const res = await fetch("/api/auth/logout");
    const data = await res.json();
    if (data.status === 200) {
      router.push("/");
    }
  }

  const auth = {
    user,
    login,
    logout,
    ...props,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
