import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { NavBar } from "./components/nav/NavBar";

export const WhoYou = () => {
  return (
    <>
      <Route
        render={(props) => {
          if (localStorage.getItem("whoyou_user_token")) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
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
