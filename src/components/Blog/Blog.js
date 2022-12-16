import { useLoaderData } from "react-router-dom";
import classes from "./Blog.module.scss";
import BlogPost from "../Post/Post";

const Blog = (props) => {

  return (
    <>
      <ul className={classes.list}>
        {props.data.posts.map((post) => (
          <BlogPost
            key={post.id}
            id={post.id}
            title={post.title}
            tags={post.tags}
          />
        ))}
      </ul>
    </>
  );
};

export default Blog;
