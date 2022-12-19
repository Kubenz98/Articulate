import { useState, useEffect } from "react";
import Post from "./Post";
import classes from "./AllPosts.module.scss";

const Posts = (props) => {
  const { posts } = props.data;

  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const inputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    let updatedPosts = [...posts];
    const identifier = setTimeout(() => {
      updatedPosts = updatedPosts.filter((post) => {
        return (
          post.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        );
      });
      if (posts.toString() !== updatedPosts.toString()) {
        setFilteredPosts(updatedPosts);
      }
      if (searchValue.length === 0) {
        setFilteredPosts(posts);
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [searchValue, posts]);

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>Blog Posts</h1>
          <input
          className={classes.searcher}
            onChange={inputHandler}
            type="text"
            placeholder="search by title"
          />
      </div>
      {filteredPosts.length === 0 && (
        <p className="text centered">No found posts!</p>
      )}
      <ul className="list">
        {filteredPosts.map((post) => (
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
