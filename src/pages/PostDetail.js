import { Outlet, useLoaderData } from "react-router-dom";
import BlogPostDetail from "../components/Post/PostDetail";
import { getPost } from "../utils/api";

const PostDetail = () => {
  const loadedPost = useLoaderData();

  return (
    <>
      <BlogPostDetail postData={loadedPost} />
      <Outlet />
    </>
  );
};

export default PostDetail;

export function loader({ params }) {
  const id = params.id;
  return getPost(id);
}
