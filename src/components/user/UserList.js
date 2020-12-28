import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";

export const UserList = (props) => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(getUsers, []);

  return (
    <>
      {users.map((user) => {
        return <div>{user.name}</div>;
      })}
    </>
  );
};
