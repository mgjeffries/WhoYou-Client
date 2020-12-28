import React from "react";
import { Button, Navbar, FormControl, Form } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";

export const UserNav = () => {
  return (
    <Navbar style={{ minHeight: "5rem" }}>
      <Form inline>
        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
      </Form>
      <Button variant="outline-secondary" className="ml-auto">
        <GiHamburgerMenu />
      </Button>
    </Navbar>
  );
};
