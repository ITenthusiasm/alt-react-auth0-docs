// src/components/PrivateRoute.js

import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth0State, auth0Client } = useAuth0();

  return (
    <Route
      {...rest}
      render={(props) => {
        // 1. Redirect to login if not logged in
        if (!auth0State.isAuthenticated) {
          if (!auth0State.loading) {
            return auth0Client.loginWithRedirect({
              appState: { targetUrl: window.location.pathname },
            });
          } else {
            return null;
          }
        }

        // 2. Render component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
