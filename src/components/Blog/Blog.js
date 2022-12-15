import { useLoaderData } from "react-router-dom";
import classes from "./Blog.module.scss";
import BlogPost from "./Posts";

const Blog = () => {
  const data = useLoaderData();

  return (
    <>
      <h1>Blog Posts</h1>
      <ul className={classes.list}>
        {data.posts.map((post) => (
          <BlogPost key={post.id} id={post.id} title={post.title} tags={post.tags} />
        ))}
      </ul>
    </>
  );
};

export default Blog;
