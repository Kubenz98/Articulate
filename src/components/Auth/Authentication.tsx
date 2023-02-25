import React, { useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

interface AuthProps {
  submitting: boolean;
  title?: string
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
      {props.title && <h1>{props.title}</h1>}
      <Form className="form" method="post">
        <div className="form__controls">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="form__controls">
          <div className="form__controls-password">
            <label htmlFor="password">Password</label>
            <Link to="/forgotPassword">forgot password?</Link>
          </div>
          <input id="password" name="password" type="password" required />
        </div>
        <div className="form__actions" style={{ marginTop: "10px" }}>
          <button className="button button--link" disabled={props.submitting}>
            {props.submitting ? "Submitting..." : "Login"}
          </button>
        </div>
        <div className="form__actions">
        </div>
        <div className="form__actions">
          <Link to="../signup" className="link">
            Click here to create new account
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Authentication;
