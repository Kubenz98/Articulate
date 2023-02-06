import React, { useEffect, useRef } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const error = useActionData() as string;
  const [user, loading] = useAuthState(auth);
  const oldPwdRef = useRef<HTMLInputElement>(null);
  const newPwdRef = useRef<HTMLInputElement>(null);
  const repeatPwdRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const IsSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, navigate, user]);

  useEffect(() => {
    if (IsSubmitting) {
      oldPwdRef.current!.value = "";
      newPwdRef.current!.value = "";
      repeatPwdRef.current!.value = "";
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 style={{ marginBottom: "30px" }}>Change password</h1>
      <Form method="post" className="form">
        <div className="form__controls">
          <label htmlFor="nick">Old Password</label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            ref={oldPwdRef}
            required
          />
        </div>
        <div className="form__controls">
          <label htmlFor="gender">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            ref={newPwdRef}
            required
          />
        </div>
        <div className="form__controls">
          <label htmlFor="nick">Repeat Password</label>
          <input
            id="passwordRepeat"
            name="passwordRepeat"
            type="password"
            ref={repeatPwdRef}
            required
          />
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button className="button button--link" disabled={IsSubmitting}>
            {IsSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default Profile;
