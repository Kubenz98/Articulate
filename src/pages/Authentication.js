import Authentication from "../components/Auth/Authentication";
import formValidation from "../helpers/formValidation";
import { useActionData } from "react-router-dom";

const AuthPage = () => {

  const actionData = useActionData();
    
  return <Authentication action={actionData} />;
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
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm8I6JVcL1eyBKSwMfQYqem7aoGZmIPbw",
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
    return data
  } catch (err) {
    throw new Error(err.message);
  }

}
