import { useEffect } from "react";
import { Form, useNavigate, useActionData } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProfileSettings = () => {
  const error = useActionData();

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, navigate, user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 style={{'marginBottom' : '30px'}}>Change password</h1>
      <Form method="post" className="form">
        <div className="form__controls">
          <label htmlFor="nick">Old Password</label>
          <input id="oldPassword" name="oldPassword" type="password" required />
        </div>
        <div className="form__controls">
          <label htmlFor="gender">New Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <div className="form__controls">
          <label htmlFor="nick">Repeat Password</label>
          <input id="passwordRepeat" name="passwordRepeat" type="password" required />
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button className="button button--link">Save</button>
        </div>
      </Form>
    </>
  );
};

export default ProfileSettings;
