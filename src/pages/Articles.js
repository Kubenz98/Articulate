import { Suspense } from "react";
import { getPosts } from "../utils/api";
import PostsList from "../components/Posts/PostsList";
import { useLoaderData, defer, Await } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const ArticlesPage = () => {
  const data = useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={data.posts}>
          {(loadedPosts) => {
            const postsCopy = [...loadedPosts];
            postsCopy.reverse()
            return <PostsList data={postsCopy} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default ArticlesPage;

export async function loader() {
  return defer({ posts: getPosts() });
}