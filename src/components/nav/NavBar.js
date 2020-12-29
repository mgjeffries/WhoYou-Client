import React from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../images/logo192.png";
import { Button, FormControl } from "react-bootstrap";

export const NavBar = () => {
  const history = useHistory();
  return (
    <Navbar expand="md">
      <Navbar.Brand as={Link} to="/">
        <img className="navbar__logo" src={Logo} alt="WhoYou" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav container ">
        <Nav className="mr-auto container-fluid">
          <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
          <Button
            variant="outline-primary"
            className="mx-2 my-1"
            onClick={() => history.push("/users")}
          >
            users
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
