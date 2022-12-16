import { getPosts } from "../utils/api";
import Blog from "../components/Blog/Blog";
import { Outlet } from "react-router-dom";

const BlogPage = () => {
  return (
    <>
      <Blog />
      <Outlet />
    </>
  );
};

export default BlogPage;

export function loader() {
  return getPosts();
}
