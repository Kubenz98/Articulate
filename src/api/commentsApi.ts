import { ref as dbRef, get, child, push, update } from "firebase/database";
import { db } from "../firebase";
import { Auth } from "firebase/auth";

import { Comment, CommentUpdates, CommentsObj } from "src/ts/commentInterfaces";

export const writePostComment = (
  auth: Auth,
  comment: Comment,
  postId: string
) => {
  if (!auth || !auth.currentUser) {
    throw new Error("commentLogin");
  }
  const commentData: Comment = {
    body: comment.body,
    date: comment.date,
    user: auth.currentUser.displayName!,
    uid: auth.currentUser.uid,
  };
  const newCommentKey = push(child(dbRef(db), postId + "comments")).key;

  const updates: CommentUpdates = {};
  updates["posts/" + postId + "/comments/" + newCommentKey] = commentData;
  updates["/user-comments/" + auth.currentUser.uid + "/" + newCommentKey] =
    commentData;

  return update(dbRef(db), updates);
};

export const getPostComments = async (id: string) => {
  const loadedComments: Comment[] = [];
  await get(child(dbRef(db), `posts/${id}/comments`))
    .then((data) => {
      const comments: CommentsObj = data.val();
      for (const comment in comments) {
        loadedComments.push({
          id: comment,
          body: comments[comment].body,
          date: comments[comment].date,
          uid: comments[comment].uid,
          user: comments[comment].user,
        });
      }
    })
    .catch((err) => {
      throw new Error("getComments");
    });

  return loadedComments;
};
