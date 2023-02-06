import React from "react";
import Profile from "../components/Profile/Profile";
import { updateUserPassword } from "../api/authApi";
import { auth } from "../firebase";
import { json } from "react-router-dom";
import {
  passwordValidation,
  equalPasswords,
} from "../helpers/signupFormValidation";

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;

export async function action(args: { request: Request }) {
  const { request } = args;
  const data = await request.formData();
  let message: string = "";

  const dataToUpdate = {
    oldPassword: data.get("oldPassword") as string,
    newPassword: data.get("password") as string,
    passwordRepeat: data.get("passwordRepeat") as string,
  };

  const passwordsEqual = equalPasswords(
    dataToUpdate.newPassword,
    dataToUpdate.passwordRepeat
  );

  const passwordLengthValidate = passwordValidation(dataToUpdate.newPassword);

  if (!passwordsEqual) {
    message = "Passwords are not the same";
  }
  if (!passwordLengthValidate) {
    message = "Password must have at least 6 characters";
  }
  if (message) return message;

  try {
    await updateUserPassword(
      auth.currentUser!,
      dataToUpdate.newPassword,
      dataToUpdate.oldPassword
    );
  } catch (err) {
    throw json({ code: err.code });
  }

  return (message = "Password changed");
}
