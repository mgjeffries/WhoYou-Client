import React, { useState } from "react";
import { ServerPath } from "../../ServerPath.js";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [thisUser, setThisUser] = useState({});
  let currentUser = parseInt(localStorage.getItem("whoyou_user_id"));

  const setThisUserToCurrent = () => {
    const thisUserFound = users.find((user) => user.id === currentUser);
    setThisUser(thisUserFound);
  };

  const getUsers = () => {
    return fetch(`${ServerPath}/users`)
      .then((res) => res.json())
      .then(setUsers)
      .then(() => setThisUserToCurrent());
  };

  const updateUserAvitar = (userId, avitar) => {
    return fetch(`${ServerPath}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
      },
      body: JSON.stringify({
        profile_image_path: avitar,
      }),
    }).then(getUsers);
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
        thisUser,
        getUsers,
        searchUsers,
        updateUserAvitar,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
