import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

export const WhoYou = () => {
  return (
    <>
      <Route
        path="/login"
        render={() => {
          if (localStorage.getItem("whoyou_user_token")) {
            return <Redirect to="/" />;
          } else {
            return <Login />;
          }
        }}
      />
      <Route
        path="/register"
        render={(props) => {
          if (localStorage.getItem("whoyou_user_token")) {
            return <Redirect to="/" />;
          } else {
            return <Register {...props} />;
          }
        }}
      />
    </>
  );
};
