import Signup from "../components/Signup/SignUp";
import formValidation from "../helpers/formValidation";
import { redirect, useNavigation, json } from "react-router-dom";
import { auth } from "../firebase";
import { signup } from "../api";

const SignupPage = () => {
  const navigation = useNavigation();

  return <Signup submitting={navigation.state === "submitting"} />;
};

export default SignupPage;

export async function action({ request }) {
  const data = await request.formData();
  const user = {
    email: data.get("email"),
    password: data.get("password"),
    passwordRepeat: data.get("password-repeat"),
    nick: data.get("nick"),
    gender: data.get("gender"),
  };

  const formIsValid = formValidation(user, false);

  if (formIsValid.error) {
    return formIsValid.error;
  }
  try {
    await signup(auth, user);
  }
  catch (err) {
    throw json({ code: err.code });
  }
  
  return redirect("/confirm");
}
