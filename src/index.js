// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider config={config}>
      <Router history={history}>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
