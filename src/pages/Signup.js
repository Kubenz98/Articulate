import Signup from "../components/Signup/SignUp";
import formValidation from "../helpers/formValidation";
import { redirect } from "react-router-dom";
import { auth } from "../firebase";
import { signup } from "../utils/api";

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;

export async function action({ request }) {
  const data = await request.formData();

  const user = {
    email: data.get("email"),
    password: data.get("password"),
    passwordRepeat: data.get("password-repeat"),
  };

  const formIsValid = formValidation(user, false);

  if (formIsValid.error) {
    return formIsValid.error;
  }
  const signUpData = await signup(auth, user.email, user.password);

  if (signUpData.error) throw new Error(signUpData.error);

  return redirect("/profile");
}
