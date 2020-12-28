import React from "react";
import { Route } from "react-router-dom";
import { UserList } from "./components/user/UserList";
import { UserProvider } from "./components/user/UserProvider";

export const ApplicationViews = () => {
  return (
    <>
      <UserProvider>
        <Route exact path="/">
          <UserList></UserList>
        </Route>

        <Route exact path="/users"></Route>
      </UserProvider>
    </>
  );
};
