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

  const updateUserAvitar = (userId, avitar) => {
    return fetch(`${ServerPath}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
      },
      body: JSON.stringify({
        profile_image_path: avitar,
      }),
    });
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
        updateUserAvitar,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
