
import Post from "./Post";

const Posts = (props) => {

  if(props.data.posts.length === 0) {
    return <p className="text">There are no posts yet!</p>
  }
    
  return (
    <>
      <ul className="list">
        {props.data.posts.map((post) => (
          <Post
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

export default Posts;
