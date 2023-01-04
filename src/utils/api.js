import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  getDatabase,
  ref as dbRef,
  set,
  child,
  push,
  update,
} from "firebase/database";

export const getPosts = async () => {
  const loadedPosts = [];
  const posts = await fetch(
    "https://blog-development-33c46-default-rtdb.firebaseio.com/posts.json"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Could not load posts.");
    }
    return response.json();
  });
  for (const post in posts) {
    loadedPosts.push({
      id: post,
      title: posts[post].title,
      tags: posts[post].tags,
      body: posts[post].body,
      uid: posts[post].uid,
      userName: posts[post].user,
      imageLink: posts[post].imageLink ? posts[post].imageLink : "",
    });
  }
  return loadedPosts;
};

export const getPost = async (id) => {
  const data = await fetch(
    `https://blog-development-33c46-default-rtdb.firebaseio.com/posts/${id}.json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Could not load post.");
    }
    return response.json();
  });

  return data;
};

export const writePostComment = async (auth, body, postId) => {
  if (!auth || !auth.currentUser) {
    throw new Error("Sign in to add new comment!");
  }

  const db = getDatabase();

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
  const comments = await fetch(
    `https://blog-development-33c46-default-rtdb.firebaseio.com/posts/${id}/comments.json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Could not load comments.");
    }
    return response.json();
  });

  for (const comment in comments) {
    loadedComments.push({
      id: comment,
      body: comments[comment].body,
      uid: comments[comment].uid,
      username: comments[comment].user,
    });
  }

  return loadedComments;
};

export const getUser = async (id) => {
  const userData = await fetch(
    `https://blog-development-33c46-default-rtdb.firebaseio.com/users/${id}.json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Could not load user.");
    }
    return response.json();
  });

  const loadedPosts = [];

  const userPosts = await fetch(
    `https://blog-development-33c46-default-rtdb.firebaseio.com/user-posts/${id}.json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Could not load user posts.");
    }
    return response.json();
  });
  for (const post in userPosts) {
    loadedPosts.push({
      id: post,
      title: userPosts[post].title,
      tags: userPosts[post].tags,
      body: userPosts[post].body,
      imageLink: userPosts[post].imageLink
    });
  }
  return { userData, loadedPosts };
};

export const getAllUsers = async () => {
  const loadedUsers = [];
  const users = await fetch(
    "https://blog-development-33c46-default-rtdb.firebaseio.com/users.json"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Could not load users.");
    }
    return response.json();
  });
  for (const user in users) {
    loadedUsers.push({
      userId: users[user].userId,
      username: users[user].username,
      email: users[user].email,
      image: users[user].profile_picture,
    });
  }
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
    });
}

export async function login(auth, email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export function logout(auth) {
  signOut(auth);
}

export async function updateUser(auth, data) {
  await updateProfile(auth.currentUser, {
    displayName: data.nick,
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

async function writeUserData(userId, email, name, gender) {
  const db = getDatabase();

  set(dbRef(db, "users/" + userId), {
    userId,
    username: name,
    email: email,
    profile_picture:
      gender === "male" ? "https://robohash.org/1" : "https://robohash.org/4",
  });
}

export async function writeNewPost(auth, data) {
  if (!auth || !auth.currentUser) {
    throw new Error("Sign in to add new posts!");
  }
  const storage = getStorage();
  const storageRef = stRef(storage, `images/${data.title}`);

  let imageLink;

  await uploadBytes(storageRef, data.image).then(async (snapshot) => {
    await getDownloadURL(snapshot.ref).then((url) => (imageLink = url));
  });

  const db = getDatabase();

  const postData = {
    title: data.title,
    tags: data.tags,
    body: data.body,
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
