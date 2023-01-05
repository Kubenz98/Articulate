import { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const SignUp = (props) => {
  const error = useActionData();

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, navigate, user]);

  return (
    <>
      <h1>Create account</h1>
      <Form className="form" method="post">
        <div className="form__controls">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="form__controls">
          <label htmlFor="nick">Nickname</label>
          <input id="nick" name="nick" type="text" required />
        </div>
        <div className="form__controls">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="form__controls">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>

        <div className="form__controls">
          <label htmlFor="passwordRepeat">Repeat Password</label>
          <input id="passwordRepeat" name="password-repeat" type="password" />
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button className="button button--link" disabled={props.submitting}>
            {props.submitting ? "Submitting..." : "Sign up"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
