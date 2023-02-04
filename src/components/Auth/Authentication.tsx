import React, { useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

interface AuthProps {
  submitting: boolean;
}

const Authentication = (props: AuthProps) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, navigate, user]);

  return (
    <>
      <h1>Login</h1>
      <Form className="form" method="post">
        <div className="form__controls">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="form__controls">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <div className="form__actions">
          <Link to="../signup" className="link">
            Click here to create new account
          </Link>
        </div>
        <div className="form__actions" style={{ marginTop: "40px" }}>
          <button className="button button--link" disabled={props.submitting}>
            {props.submitting ? "Submitting..." : "Login"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default Authentication;
