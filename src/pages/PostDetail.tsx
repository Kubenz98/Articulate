import React, { Suspense } from "react";
import { Outlet, useLoaderData, defer, Await, Params } from "react-router-dom";
import PostDetail from "../components/Posts/PostDetail";
import { getPost } from "../api/postsApi";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import { PostsArr, Post } from "src/ts/postInterfaces";

const PostDetailPage = () => {
  const post = useLoaderData() as PostsArr;

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={post.data}>
          {(loadedPost: Post) => <PostDetail postData={loadedPost} />}
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
};

export default PostDetailPage;

export async function loader(args: { params: Params }) {
  const { params } = args;
  const id = params.id;
  return defer({ data: getPost(id!) });
}
