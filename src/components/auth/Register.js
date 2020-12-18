import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Image, Form, Button, Row } from "react-bootstrap";
import logoLargeDetail from "./logoLargeDetail.png";

export const Register = (props) => {
  const [formValues, setFormValues] = useState({});

  /**
   * Handle a controlled form input change. Update formValues in state to reflect new form state.
   */
  const handleFormChange = (e) => {
    const updatedFormValues = Object.assign({}, formValues);
    updatedFormValues[e.target.name] = e.target.value;
    setFormValues(updatedFormValues);
  };

  /**
   * Handle the register form submit. Verify that the passwords match, then post the new user to the API.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // grab all of the values off the formValues state object for each form input
    const { name, phone, email, password } = formValues;

    const newUser = {
      name,
      phone,
      email,
      password,
    };

    return fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((res) => {
        // After successful POST to /register, response will contain auth token and WhoYou id, set those in localStorage
        // and redirect us on to the app with those values set
        localStorage.setItem("whoyou_user_token", res.token);
        localStorage.setItem("whoyou_user_id", res.user_id);
        props.history.push("/");
      });
  };

  return (
    <main style={{ padding: "2rem" }}>
      <Form onSubmit={handleFormSubmit}>
        <Row className="justify-content-around" style={{ minHeight: "450px" }}>
          <Col
            sm="12"
            md="5"
            className="d-flex flex-column align-items-center justify-content-between"
          >
            <Image
              className="my-2"
              src={logoLargeDetail}
              width={1433 / 4}
              height={1054 / 4}
            />
          </Col>

          <Col
            sm="12"
            md="5"
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <Form.Group className="container-fluid">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                className="my-2"
                name="name"
                onChange={handleFormChange}
                value={formValues.name || ""}
              />
            </Form.Group>

            <Form.Group className="container-fluid">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                required
                className="my-2"
                name="phone"
                onChange={handleFormChange}
                value={formValues.phone || ""}
              />
            </Form.Group>

            <Form.Group className="container-fluid">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                className="my-2"
                name="email"
                onChange={handleFormChange}
                value={formValues.email || ""}
              />
            </Form.Group>

            <Form.Group className="container-fluid">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                className="my-2"
                name="password"
                onChange={handleFormChange}
                value={formValues.password || ""}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="submit"
          variant="success"
          className="d-block mx-auto my-4 w-25"
        >
          Register
        </Button>
      </Form>

      <Row className="justify-content-center">
        <Link to="/login">Already Have an account? Click here to log in!</Link>
      </Row>
    </main>
  );
};
