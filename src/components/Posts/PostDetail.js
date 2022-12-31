import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./PostDetail.module.scss";

const BlogPostDetail = (props) => {
  const [showComments, setShowComments] = useState(false);

  const commentsHandler = () => {
    setShowComments((state) => !state);
  };

  const { postData } = props;

  const buttonClass = `button ${classes.button}`;

  let button = (
    <Link to="comments" className={buttonClass} onClick={commentsHandler}>
      {showComments ? "Hide Comments" : "Show Comments"}
    </Link>
  );

  if (showComments) {
    button = (
      <Link
        to=".."
        relative="path"
        className={buttonClass}
        onClick={commentsHandler}
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </Link>
    );
  }

  const userId = postData.uid;

  return (
    <div className={classes.post}>
      <span className={classes["post__tags"]}>{postData.tags}</span>
      <h3 className={classes["post__title"]}>{postData.title}</h3>
      <p className={classes["post__text"]}>{postData.body}</p>
      <Link
        to={`/users/${userId}`}
        relative="route"
        className={classes["post__author"]}
      >
        author: <strong>{postData.user}</strong>
      </Link>
      {button}
    </div>
  );
};

export default BlogPostDetail;
