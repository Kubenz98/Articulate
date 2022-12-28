import ProfileData from "../components/ProfileData/ProfileData";
import { updateUser } from "../utils/api";
import { auth } from "../firebase";
import { redirect } from "react-router-dom";

const Profile = () => {
  return <ProfileData />;
};

export default Profile;

export async function action({ request }) {
  const data = await request.formData();
  let errorMessage;

  const dataToUpdate = {
    nick: data.get("nick"),
    gender: data.get("gender"),
  };

  if (dataToUpdate.nick.trim().length === 0) {
    errorMessage = "Nickname is too short!";
  }
  if (errorMessage) return errorMessage;

  const updateUserData = await updateUser(auth, dataToUpdate);

  if (updateUserData.error) throw new Error(updateUserData.error);

  return redirect("/");
}
