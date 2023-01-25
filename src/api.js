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

import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { ref as dbRef, get, child, push, update } from "firebase/database";
import { db } from "./firebase";

export const getPosts = async () => {
  const loadedPosts = [];
  await get(child(dbRef(db), `posts`))
    .then((data) => {
      const posts = data.val();
      for (const post in posts) {
        loadedPosts.push({
          id: post,
          title: posts[post].title,
          tags: posts[post].tags,
          body: posts[post].body,
          imageLink: posts[post].imageLink ? posts[post].imageLink : "",
        });
      }
    })
    .catch((err) => {
      throw new Error("postsError");
    });
  return loadedPosts;
};

export const getPost = async (id) => {
  let data;
  await get(child(dbRef(db), `posts/${id}`))
    .then((post) => {
      data = post.val();
    })
    .catch((err) => {
      throw new Error("postError");
    });
  return data;
};

export const writePostComment = (auth, body, postId) => {
  if (!auth || !auth.currentUser) {
    throw new Error("commentLogin");
  }
  const commentData = {
    body,
    user: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
  };

  const newCommentKey = push(
    child(dbRef(db), "posts/" + postId + "comments")
  ).key;

  const updates = {};
  updates["/posts/" + postId + "/comments/" + newCommentKey] = commentData;
  updates["/user-comments/" + auth.currentUser.uid + "/" + newCommentKey] =
    commentData;

  return update(dbRef(db), updates);
};

export const getPostComments = async (id) => {
  const loadedComments = [];
  await get(child(dbRef(db), `posts/${id}/comments`))
    .then((data) => {
      const comments = data.val();
      for (const comment in comments) {
        loadedComments.push({
          id: comment,
          body: comments[comment].body,
          uid: comments[comment].uid,
          username: comments[comment].user,
        });
      }
    })
    .catch((err) => {
      throw new Error("getComments");
    });

  return loadedComments;
};

export const getUser = async (id) => {
  let userData;
  await get(child(dbRef(db), `users/${id}`))
    .then((post) => {
      userData = post.val();
    })
    .catch((err) => {
      throw new Error("getUser");
    });

  const loadedPosts = [];

  await get(child(dbRef(db), `user-posts/${id}`))
    .then((data) => {
      const posts = data.val();
      for (const post in posts) {
        loadedPosts.push({
          id: post,
          title: posts[post].title,
          tags: posts[post].tags,
          body: posts[post].body,
          imageLink: posts[post].imageLink ? posts[post].imageLink : "",
        });
      }
    })
    .catch((err) => {
      throw new Error("userPostsError");
    });
  return { userData, loadedPosts };
};

export const getAllUsers = async () => {
  const loadedUsers = [];
  await get(child(dbRef(db), `users`))
    .then((data) => {
      const users = data.val();
      for (const user in users) {
        loadedUsers.push({
          userId: users[user].userId,
          username: users[user].username,
          email: users[user].email,
          image: users[user].profile_picture,
        });
      }
    })
    .catch((err) => {
      throw new Error("usersError");
    });
  return loadedUsers;
};

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

export async function writeNewPost(auth, data) {
  if (!auth || !auth.currentUser) {
    throw new Error("Sign in to add new posts!");
  }
  const storage = getStorage();
  const storageRef = stRef(storage, `images/${data.title}`);

  let imageLink;

  if (data.image.size > 0) {
    await uploadBytes(storageRef, data.image).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => (imageLink = url));
    });
  } else {
    imageLink =
      "https://firebasestorage.googleapis.com/v0/b/articulate-project.appspot.com/o/default_image.jpg?alt=media&token=97bc62fb-203e-4c1a-a036-1f3c67f2d3f0";
  }

  const postData = {
    title: data.title,
    tags: data.tags,
    body: data.body,
    date: data.date,
    user: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    imageLink,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(dbRef(db), "posts")).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/posts/" + newPostKey] = postData;
  updates["/user-posts/" + auth.currentUser.uid + "/" + newPostKey] = postData;

  return update(dbRef(db), updates);
}
