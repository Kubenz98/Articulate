import { Suspense } from "react";
import { getPosts } from "../utils/api";
import PostsList from "../components/Posts/PostsList";
import { useLoaderData, defer, Await } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const BlogPage = () => {
  const data = useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={data.posts}>
          {(loadedPosts) => <PostsList data={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
};

export default BlogPage;

export async function loader() {
  return defer({ posts: getPosts() });
}
