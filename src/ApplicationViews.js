import React from "react";
import { Route } from "react-router-dom";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <div>Yo</div>
      </Route>
      <Route exact path="/users"></Route>
    </>
  );
};
