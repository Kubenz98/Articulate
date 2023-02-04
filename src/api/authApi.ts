import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
  Auth,
  User,
} from "firebase/auth";
import { ref as dbRef, update } from "firebase/database";
import { db } from "../firebase";
import { SignupUserData } from "src/ts/userInterfaces";

export async function signup(auth: Auth, user: SignupUserData) {
  await createUserWithEmailAndPassword(auth, user.email, user.password).then(
    async (userData) => {
      await writeUserData(
        userData.user.uid,
        userData.user.email!,
        user.nick,
        user.gender
      );
      await updateProfile(auth.currentUser!, {
        displayName: user.nick,
        photoURL:
          user.gender === "male"
            ? "https://robohash.org/1"
            : "https://robohash.org/4",
      });
      await sendEmailVerification(auth.currentUser!);
      logout(auth);
    }
  );
}

export async function login(auth: Auth, email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export function logout(auth: Auth) {
  signOut(auth);
}

export async function updateUserPassword(
  user: User,
  newPassword: string,
  oldPassword: string
) {
  const credential = EmailAuthProvider.credential(user.email!, oldPassword);

  await reauthenticateWithCredential(user, credential);

  updatePassword(user, newPassword);
}

async function writeUserData(
  userId: string,
  email: string,
  username: string,
  gender: string
) {
  const usernamesUpdate = {};
  usernamesUpdate["/usernames/" + username.toLowerCase()] = userId;

  await update(dbRef(db), usernamesUpdate);

  const userUpdate = {};

  userUpdate["/users/" + userId + "/username"] = username;

  await update(dbRef(db), userUpdate);

  const userDataUpdate = {};
  userDataUpdate["/users/" + userId] = {
    userId,
    username,
    email,
    profile_picture:
      gender === "male" ? "https://robohash.org/1" : "https://robohash.org/4",
  };

  return update(dbRef(db), userDataUpdate);
}
