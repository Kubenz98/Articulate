
import { ref as dbRef, get, child, push, update } from "firebase/database";
import { db } from "../firebase";

export const writePostComment = (auth, body, postId) => {
  if (!auth || !auth.currentUser) {
    throw new Error("commentLogin");
  }
  const commentData = {
    body: body.text,
    date: body.date,
    user: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
  };
  const newCommentKey = push(child(dbRef(db), postId + "comments")).key;

  const updates = {};
  updates["posts/" + postId + "/comments/" + newCommentKey] = commentData;
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
          date: comments[comment].date,
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