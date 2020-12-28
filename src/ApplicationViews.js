import React from "react";
import { Route } from "react-router-dom";
import { UserList } from "./components/user/UserList";
import { UserNav } from "./components/user/UserNav";
import { UserProvider } from "./components/user/UserProvider";

export const ApplicationViews = () => {
  return (
    <>
      <UserProvider>
        <Route exact path="/">
          <UserNav />
          <UserList />
        </Route>

        <Route exact path="/users"></Route>
      </UserProvider>
    </>
  );
};
