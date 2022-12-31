import { useEffect } from "react";
import { Form, useNavigate, useActionData } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProfileData = () => {
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
      <h1>Update Profile</h1>
      <Form method="post" className="form">
        <div className="form__controls">
          <label htmlFor="gender">Gender (changes avatar)</label>
          <select name="gender" id="gender">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="form__controls">
          <label htmlFor="nick">Nickname</label>
          <input id="nick" name="nick" type="text" required />
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button className="button button--link">Save</button>
        </div>
      </Form>
    </>
  );
};

export default ProfileData;
