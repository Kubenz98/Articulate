import React from "react";
import { redirect, useNavigation, json } from "react-router-dom";
import ForgotPassword from "src/components/ForgotPassword/ForgotPassword";
import { emailValidation } from "src/helpers/signupFormValidation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "src/firebase";

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  return <ForgotPassword submitting={(navigation.state === "submitting")} />;
};

export default ForgotPasswordPage;

export async function action(args: { request: Request }) {
  const { request } = args;

  const data = await request.formData();
  const email = data.get("email") as string;

  const emailIsValid = emailValidation(email);

  if (!emailIsValid) {
    return "Provided e-mail is invalid";
  }

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw json({ code: err.code });
  }
  return redirect("/");
}
