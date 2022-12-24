import { Form, useActionData } from "react-router-dom";
import classes from "../Auth/Authentication.module.scss";

const SignUp = () => {
  const error = useActionData();

  return (
    <>
      <h1>Create account</h1>
      <Form className={classes.form} method="post">
        <div className={classes.controls}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={classes.controls}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>

        <div className={classes.controls}>
          <label htmlFor="passwordRepeat">Repeat Password</label>
          <input id="passwordRepeat" name="password-repeat" type="password" />
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className={classes.actions}>
          <button className="button button--link">Sign up</button>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
