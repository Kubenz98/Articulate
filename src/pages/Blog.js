import { Suspense } from "react";
import { getPosts } from "../utils/api";
import Blog from "../components/Blog/Blog";
import { useLoaderData, defer, Await } from "react-router-dom";

const BlogPage = () => {
  const data = useLoaderData();

  return (
    <>
      <h1>Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={data.posts}>
        {(loadedPosts) => <Blog data={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
};

export default BlogPage;

export async function loader() {
  return defer({ posts: getPosts() });
}
