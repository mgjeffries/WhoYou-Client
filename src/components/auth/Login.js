import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";
import Button from "react-bootstrap/Button";

export const Login = () => {
  const username = useRef();
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
        username: username.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.valid) {
          localStorage.setItem("rare_user_token", res.token);
          localStorage.setItem("rare_user_id", res.user_id);
          if (res.is_admin) {
            localStorage.setItem("is_admin", "true");
          }
          history.push("/");
        } else {
          invalidDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>username or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>News Hounds</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputUsername"> Username </label>
            <input
              ref={username}
              type="username"
              id="username"
              className="form-control"
              defaultValue="me@me.com"
              placeholder="username"
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
