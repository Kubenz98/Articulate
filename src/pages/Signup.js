import Signup from "../components/Signup/SignUp";
import formValidation from "../helpers/formValidation";
import { redirect, useNavigation, json } from "react-router-dom";
import { auth } from "../firebase";
import { signup } from "../api/authApi";
import { get, child, ref as dbRef } from "firebase/database";
import { db } from "../firebase";

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
  let usernames;
  try {
    await get(child(dbRef(db), `usernames`)).then((response) => {
      const data = response.val();
      usernames = Object.keys(data);
    });
  } catch (err) {
    throw json({ code: err.code ? err.code : err.message });
  }

  const formIsValid = formValidation(user, false, usernames);

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
