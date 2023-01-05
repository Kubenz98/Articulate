import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Authentication = () => {
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(null);
  const action = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    setError(action);
  }, [action]);

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
          <input id="password" name="password" type="password" />
        </div>
        <div className="form__actions">
          <Link to="../signup" className="link">
            Click here to create new account
          </Link>
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions" style={{ marginTop: "40px" }}>
          <button className="button button--link">Login</button>
        </div>
      </Form>
    </>
  );
};

export default Authentication;
