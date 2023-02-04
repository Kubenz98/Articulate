import React from "react";
import Signup from "../components/Signup/SignUp";
import signupFormValidation from "../helpers/signupFormValidation";
import { redirect, useNavigation, json } from "react-router-dom";
import { auth } from "../firebase";
import { signup } from "../api/authApi";
import { get, child, ref as dbRef } from "firebase/database";
import { db } from "../firebase";

import { SignupUserData } from "src/ts/userInterfaces";

const SignupPage = () => {
  const navigation = useNavigation();

  return <Signup submitting={navigation.state === "submitting"} />;
};

export default SignupPage;

interface Usernames {
  [key: string]: string
}

export async function action(args: { request: Request }) {
  const { request } = args;
  const data = await request.formData();
  const user: SignupUserData = {
    email: data.get("email") as string,
    password: data.get("password") as string,
    passwordRepeat: data.get("password-repeat") as string,
    nick: data.get("nick") as string,
    gender: data.get("gender") as string,
  };
  let usernames: string[] = [];
  try {
    await get(child(dbRef(db), `usernames`)).then((response) => {
      const data: Usernames  = response.val();
      usernames = Object.keys(data);
    });
  } catch (err) {
    throw json({ code: err.code ? err.code : err.message });
  }

  const formIsValid = signupFormValidation(user, false, usernames);

  if (formIsValid.error) {
    return formIsValid.error;
  }
  try {
    await signup(auth, user);
  } catch (err) {
    throw json({ code: err.code });
  }

  return redirect("/confirm");
}
