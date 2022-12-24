import Signup from "../components/Signup/SignUp";
import formValidation from "../helpers/formValidation";
import { redirect } from "react-router-dom";

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
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm8I6JVcL1eyBKSwMfQYqem7aoGZmIPbw",
      {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message);
    }

  } catch (err) {
    throw new Error(err.message);
  }

  return redirect("/");
}
