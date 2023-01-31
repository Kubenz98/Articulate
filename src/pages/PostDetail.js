import { Suspense } from "react";
import { Outlet, useLoaderData, defer, Await } from "react-router-dom";
import PostDetail from "../components/Posts/PostDetail";
import { getPost } from "../api/postsApi";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const PostDetailPage = () => {
  const data = useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={data.post}>
          {(loadedPost) => <PostDetail postData={loadedPost} />}
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
};

export default PostDetailPage;

export async function loader({ params }) {
  const id = params.id;
  return defer({ post: getPost(id) });
}
