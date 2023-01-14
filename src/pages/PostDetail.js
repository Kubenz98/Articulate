import { Suspense } from "react";
import { Outlet, useLoaderData, defer, Await } from "react-router-dom";
import BlogPostDetail from "../components/Posts/PostDetail";
import { getPost } from "../api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const PostDetail = () => {
  const data = useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={data.post}>
          {(loadedPost) => <BlogPostDetail postData={loadedPost} />}
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
};

export default PostDetail;

export async function loader({ params }) {
  const id = params.id;
  return defer({ post: getPost(id) });
}
