import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Register } from "./components/auth/Register";

export const App = () => {
  return (
    <Route
      path="/register"
      render={(props) => {
        if (localStorage.getItem("rare_user_id")) {
          return <Redirect to="/" />;
        } else {
          return <Register {...props} />;
        }
      }}
    />
  );
};

export default App;
