import React from "react";
import { Route } from "react-router-dom";
import { UserDetail } from "./components/user/UserDetail";
import { UserList } from "./components/user/UserList";
import { UserProvider } from "./components/user/UserProvider";

export const ApplicationViews = () => {
  return (
    <>
      <UserProvider>
        <Route exact path="/"></Route>

        <Route exact path="/users">
          <UserList />
        </Route>
        <Route exact path="/users/:userId(\d+)">
          <UserDetail />
        </Route>
      </UserProvider>
    </>
  );
};
