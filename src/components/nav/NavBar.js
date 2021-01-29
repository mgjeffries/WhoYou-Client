import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../images/logo192.png";
import { Button, FormControl } from "react-bootstrap";
import { UserContext } from "../user/UserProvider";

export const NavBar = () => {
  const history = useHistory();
  const { thisUser, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Navbar expand="md">
      <Navbar.Brand
        as={Link}
        to={`/users/${localStorage.getItem("whoyou_user_id")}`}
      >
        <img
          className="navbar__logo"
          src={thisUser ? thisUser.profile_image_path : Logo}
          alt="WhoYou"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav container ">
        <Nav className="mr-auto container-fluid">
          <Button
            variant="outline-primary"
            className="mx-2 my-1"
            onClick={() => history.push("/users")}
          >
            users
          </Button>
          <Button
            variant="outline-primary"
            className="mx-2 my-1"
            onClick={() => history.push("/notifications")}
          >
            notifications
          </Button>
          <Button
            variant="outline-primary"
            className="mx-2 my-1 ml-md-auto"
            onClick={() => {
              localStorage.removeItem("whoyou_user_id");
              localStorage.removeItem("whoyou_user_token");
              history.push("/login");
            }}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
