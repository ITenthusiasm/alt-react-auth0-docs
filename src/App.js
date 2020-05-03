// src/App.js

import React from "react";
import NavBar from "./components/NavBar";

import { Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
