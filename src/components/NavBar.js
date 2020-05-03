// src/components/NavBar.js

import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const { auth0State, auth0Client } = useAuth0();

  if (!auth0State.isAuthenticated) {
    return (
      <nav>
        <button onClick={() => auth0Client.loginWithRedirect()}>Log in</button>
      </nav>
    );
  }

  return (
    <nav>
      <button onClick={() => auth0Client.logout()}>Log out</button>
      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
      </span>
    </nav>
  );
};

export default NavBar;
