import React from "react";
import { Button, Navbar, FormControl, Form } from "react-bootstrap";

export const UserNav = () => {
  return (
    <Navbar style={{ minHeight: "5rem" }}>
      <Form inline>
        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
      </Form>
      <Button className="ml-auto">Drawer</Button>
    </Navbar>
  );
};
