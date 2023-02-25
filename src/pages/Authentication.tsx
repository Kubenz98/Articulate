import React from 'react';
import Authentication from "../components/Auth/Authentication";
import { json, redirect, useNavigation } from "react-router-dom";
import { login } from "../api/authApi";
import { auth } from "../firebase";
import { UserAuth } from 'src/ts/userInterfaces';

const AuthPage = () => {
  const navigation = useNavigation();
  return <Authentication submitting={navigation.state === "submitting"} title="Log in" />;
};

export default AuthPage;

export async function action(args: { request: Request }) {
  const { request } = args;
  const data = await request.formData();

  const user: UserAuth = {
    email: data.get("email") as string,
    password: data.get("password") as string,
  };
  try {
    await login(auth, user.email, user.password);
  } catch (err) {
    throw json({ code: err.code });
  }

  return redirect("/posts?page=1");
}
