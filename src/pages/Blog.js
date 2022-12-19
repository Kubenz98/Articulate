import { Suspense } from "react";
import { getPosts } from "../utils/api";
import Posts from "../components/Posts/AllPosts";
import { useLoaderData, defer, Await } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const BlogPage = () => {
  const data = useLoaderData();

  return (
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={data.posts}>
        {(loadedPosts) => <Posts data={loadedPosts} />}
        </Await>
      </Suspense>
  );
};

export default BlogPage;

export async function loader() {
  return defer({ posts: getPosts() });
}
