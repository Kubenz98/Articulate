
import BlogPost from "../Post/Post";

const Blog = (props) => {
  
  return (
    <>
      <ul className="list">
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
