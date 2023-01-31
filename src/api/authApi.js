import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
} from "firebase/auth";

import { ref as dbRef, update } from "firebase/database";
import { db } from "../firebase";


export async function signup(auth, user) {
  await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userData) => {
      await writeUserData(
        userData.user.uid,
        userData.user.email,
        user.nick,
        user.gender
      );
    })
    .then(async () => {
      await updateProfile(auth.currentUser, {
        displayName: user.nick,
        photoURL:
          user.gender === "male"
            ? "https://robohash.org/1"
            : "https://robohash.org/4",
      });
    })
    .then(async () => {
      await sendEmailVerification(auth.currentUser);
    })
    .then(() => logout(auth));
}

export async function login(auth, email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export function logout(auth) {
  signOut(auth);
}

export async function updateUser(auth, data) {
  await updateProfile(auth.currentUser, {
    photoURL:
      data.gender === "male"
        ? "https://robohash.org/1"
        : "https://robohash.org/4",
  });
  await writeUserData(
    auth.currentUser.uid,
    auth.currentUser.email,
    data.nick,
    auth.currentUser.photoURL
  );
}

export async function updateUserPassword(user, newPassword, oldPassword) {
  const credential = EmailAuthProvider.credential(user.email, oldPassword);

  await reauthenticateWithCredential(user, credential);

  updatePassword(user, newPassword);
}

async function writeUserData(userId, email, username, gender) {
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