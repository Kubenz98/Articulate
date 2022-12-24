import { Form, Link } from "react-router-dom";
import classes from "./Authentication.module.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

const Authentication = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const { action } = props;

  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof action === "object") {
      const token = action.idToken;
      authCtx.login(token);
      navigate("/");

    } else setError(action);
  }, [action, authCtx, navigate]);

  return (
    <>
      <h1>Login</h1>
      <Form className={classes.form} method="post">
        <div className={classes.controls}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={classes.controls}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        <Link to="../signup" className={classes.create}>
          Click here to create new account
        </Link>
        {error && <p className="error-form">{error}</p>}
        <div className={classes.actions}>
          <button className="button button--link">Login</button>
        </div>
      </Form>
    </>
  );
};

export default Authentication;
