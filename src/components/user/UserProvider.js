import React, { useState } from "react";
import { ServerPath } from "../../ServerPath.js";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch(`${ServerPath}/users`)
      .then((res) => res.json())
      .then(setUsers);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
