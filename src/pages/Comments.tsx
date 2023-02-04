import React, { Suspense } from "react";
import { useLoaderData, defer, Await, Params } from "react-router-dom";
import Comments from "../components/Comments/CommentsList";
import { getPostComments, writePostComment } from "../api/commentsApi";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { auth } from "../firebase";

import { CommentsArr, Comment } from "src/ts/commentInterfaces";

const CommentsPage = () => {
  const comments = useLoaderData() as CommentsArr;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={comments.data}>
        {(loadedComments: Comment[]) => (
          <Comments data={loadedComments} auth={auth} />
        )}
      </Await>
    </Suspense>
  );
};

export default CommentsPage;

export async function loader(args: { params: Params }) {
  const { params } = args;
  return defer({ data: getPostComments(params.id!) });
}

export async function action(args: { request: Request; params: Params }) {
  const { request } = args;
  const { params } = args;
  let reset = true;

  const data = await request.formData();

  const commentBody: Comment = {
    body: data.get("comment") as string,
    date: Date.now(),
  };

  if (commentBody.body.length < 3) {
    return "The comment must be at least 3 characters long";
  }

  await writePostComment(auth, commentBody, params.id!);

  return reset;
}
