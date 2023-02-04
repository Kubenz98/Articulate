import React, { Suspense } from "react";
import { getPosts } from "../api/postsApi";
import PostsList from "../components/Posts/PostsList";
import { useLoaderData, defer, Await } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { PostsArr, Post } from "src/ts/postInterfaces";

const PostsPage = () => {
  const posts = useLoaderData() as PostsArr;
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={posts.data}>
        {(loadedPosts: Post[]) => {
          const postsCopy = [...loadedPosts];
          postsCopy.reverse();
          return <PostsList data={postsCopy} />;
        }}
      </Await>
    </Suspense>
  );
};

export default PostsPage;

export async function loader() {
  return defer({ data: getPosts("main") });
}
