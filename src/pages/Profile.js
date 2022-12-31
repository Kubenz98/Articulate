import ProfileData from "../components/ProfileData/ProfileData";
import { updateUserPassword } from "../utils/api";
import { auth } from "../firebase";
import { redirect } from "react-router-dom";
import { passwordValidation, equalPasswords } from "../helpers/formValidation";

const Profile = () => {
  return <ProfileData />;
};

export default Profile;

export async function action({ request }) {

  const data = await request.formData();
  let errorMessage;

  const dataToUpdate = {
    oldPassword: data.get("oldPassword"),
    newPassword: data.get("password"),
    passwordRepeat: data.get("passwordRepeat"),
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

  await updateUserPassword(auth.currentUser, dataToUpdate.newPassword, dataToUpdate.oldPassword)

  return redirect("/")
}
