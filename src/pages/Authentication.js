import Authentication from "../components/Auth/Authentication";
import formValidation from "../helpers/formValidation";
import { json, redirect } from "react-router-dom";
import { login } from "../api";
import { auth } from "../firebase";

const AuthPage = () => {
  return <Authentication />;
};

export default AuthPage;

export async function action({ request }) {
  const data = await request.formData();

  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const formIsValid = formValidation(user);

  if (formIsValid.error) {
    return formIsValid.error;
  }
  try {
    await login(auth, user.email, user.password);
  } catch (err) {
    throw json({ code: err.code });
  }

  return redirect("/");
}
