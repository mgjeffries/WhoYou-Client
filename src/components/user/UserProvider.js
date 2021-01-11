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

  const searchUsers = (searchString) => {
    if (searchString != "") {
      return fetch(`${ServerPath}/users?name=${searchString}`)
        .then((res) => res.json())
        .then(setUsers);
    } else {
      getUsers();
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        searchUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
