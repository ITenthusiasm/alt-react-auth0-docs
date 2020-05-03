// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import history from "./utils/history";

export const Auth0Context = React.createContext();

export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({ children, config }) => {
  // Auth0 State
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();

  // Auth0 Client
  const [auth0Client, setAuth0] = useState();

  useEffect(() => {
    (async function initAuth0() {
      const auth0FromHook = await createAuth0Client({ ...config });
      setAuth0(auth0FromHook);

      const { search } = window.location;
      if (search.includes("code=") && search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        const targetUrl = appState?.targetUrl;
        history.push(targetUrl || "/");
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    })();
  }, [config]);

  return (
    <Auth0Context.Provider
      value={{
        auth0State: { loading, isAuthenticated, user },
        auth0Client,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
