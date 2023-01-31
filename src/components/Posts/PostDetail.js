import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import classes from "./PostDetail.module.scss";

const PostDetail = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [image, setImage] = useState("");
  const location = useLocation();

  const { postData } = props;

  let date;

  if (postData.date) {
    date = new Date(postData.date);
  }

  useEffect(() => {
    if (!postData.imageLink) return;
    const img = new Image();
    img.src = postData.imageLink;
    img.onload = () => setImage(img);
  }, [postData.imageLink]);

  useEffect(() => {
    if (location.pathname.endsWith("comments")) {
      setShowComments(true);
    }
  }, [location.pathname]);

  const commentsHandler = () => {
    setShowComments((state) => !state);
  };

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

  return image || !postData.imageLink ? (
    <div className={classes.post}>
      <span className={classes["post__tags"]}>{postData.tags}</span>
      <h3 className={classes["post__title"]}>{postData.title}</h3>

      {image && (
        <div className={classes["post__image"]}>
          <img src={image.src} alt="article" />
        </div>
      )}
      <pre className={classes["post__text"]}>{postData.body}</pre>
      <span className={classes["post__author"]}>
        author:{" "}
        <Link to={`/users/${userId}`} relative="route">
          {postData.user}
        </Link>
        {date !== undefined ? date.toLocaleDateString() : null}
      </span>
      {button}
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default PostDetail;
