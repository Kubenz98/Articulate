import React from "react";
import Profile from "../components/Profile/Profile";
import { updateUserPassword } from "../api/authApi";
import { auth } from "../firebase";
import { redirect } from "react-router-dom";
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
  let errorMessage: string = "";

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
    errorMessage = "Passwords are not the same.";
  }
  if (!passwordLengthValidate) {
    errorMessage = "Password must have at least 6 characters";
  }
  if (errorMessage) return errorMessage;

  await updateUserPassword(
    auth.currentUser!,
    dataToUpdate.newPassword,
    dataToUpdate.oldPassword
  );

  return redirect("/");
}
