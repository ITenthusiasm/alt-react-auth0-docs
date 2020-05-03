// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { auth0State } = useAuth0();

  if (!auth0State.user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={auth0State.user.picture} alt="Profile" />

      <h2>{auth0State.user.name}</h2>
      <p>{auth0State.user.email}</p>
      <code>{JSON.stringify(auth0State.user, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;
