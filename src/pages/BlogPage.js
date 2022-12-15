import { getPosts } from "../utils/api";
import Blog from "../components/Blog/Blog";
const BlogPage = () => {

  return (
    <Blog />
  )
}

export default BlogPage;

export function loader() {
  return getPosts();
}