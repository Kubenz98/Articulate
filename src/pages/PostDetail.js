import { useLoaderData } from "react-router-dom";
import BlogPostDetail from "../components/Blog/PostDetail";
import { getPost } from "../utils/api";

const PostDetail = () => {

  const loadedPost = useLoaderData();
  
  return <BlogPostDetail post={loadedPost} />
}

export default PostDetail;

export function loader({params}) {
  const id = params.id
  return getPost(id)
}