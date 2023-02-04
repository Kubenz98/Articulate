import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, get, child, push, update } from "firebase/database";
import { db } from "../firebase";
import { Auth } from "firebase/auth";

import {
  PostsObj,
  Post,
  WritePostFormData,
  PostsUpdates,
} from "src/ts/postInterfaces";

export const getPosts = async (path: string) => {
  const loadedPosts: Post[] = [];
  await get(child(dbRef(db), path))
    .then((data) => {
      const posts: PostsObj = data.val();
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

export const getPost = async (id: string) => {
  let data: Post;
  await get(child(dbRef(db), `posts/${id}`))
    .then((post) => {
      data = post.val();
    })
    .catch((err) => {
      throw new Error("postError");
    });
  return data!;
};

export async function writeNewPost(auth: Auth, data: WritePostFormData) {
  if (!auth || !auth.currentUser) {
    throw new Error("Sign in to add new posts!");
  }
  const storage = getStorage();
  const storageRef = stRef(storage, `images/${data.title}`);

  let imageLink = "";

  if (data.image.size > 0) {
    await uploadBytes(storageRef, data.image).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => (imageLink = url));
    });
  } else {
    imageLink =
      "https://firebasestorage.googleapis.com/v0/b/articulate-project.appspot.com/o/default_image.jpg?alt=media&token=97bc62fb-203e-4c1a-a036-1f3c67f2d3f0";
  }

  const postData: Post = {
    title: data.title,
    tags: data.tags,
    body: data.body,
    date: data.date,
    user: auth.currentUser.displayName!,
    uid: auth.currentUser.uid,
    imageLink,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(dbRef(db), "posts")).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates: PostsUpdates = {};
  updates["/posts/" + newPostKey] = postData;
  updates["/queue/" + newPostKey] = postData;
  updates["/user-posts/" + auth.currentUser.uid + "/" + newPostKey] = postData;

  return update(dbRef(db), updates);
}
