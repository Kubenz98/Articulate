import { Suspense } from "react";
import { Outlet, useLoaderData, defer, Await } from "react-router-dom";
import BlogPostDetail from "../components/Post/PostDetail";
import { getPost } from "../utils/api";

const PostDetail = () => {
  const data = useLoaderData();

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
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
