import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import logoLargeDetail from "./logoLargeDetail.png";
import { Image, Button, Form } from "react-bootstrap";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const invalidDialog = useRef();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.valid) {
          localStorage.setItem("whoyou_user_token", res.token);
          localStorage.setItem("whoyou_user_id", res.user_id);
          history.push("/");
        } else {
          invalidDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>email or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <Image
            className="my-2"
            src={logoLargeDetail}
            width={1433 / 4}
            height={1054 / 4}
          />

          <fieldset>
            <label htmlFor="inputemail"> Email </label>
            <input
              ref={email}
              type="email"
              id="email"
              className="form-control"
              defaultValue="me@me.com"
              placeholder="email"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control"
              defaultValue="me"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset
            style={{
              textAlign: "center",
            }}
          >
            <Button className="btn btn-1 " type="submit">
              Sign In
            </Button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
