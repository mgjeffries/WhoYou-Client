import React from "react";
import { Route } from "react-router-dom";
import { UserProvider } from "./components/user/UserProvider";

export const ApplicationViews = () => {
  return (
    <>
      <UserProvider>
        <Route exact path="/">
          <div>Yo</div>
        </Route>

        <Route exact path="/users"></Route>
      </UserProvider>
    </>
  );
};
