import { useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import classes from "./PostDetail.module.scss"

const BlogPostDetail = (props) => {
console.log(props.postData.user);

  const [showComments, setShowComments] = useState(false);

  let postClass = classes.post;
  let tagsClass = classes['post__tags'];
  let buttonClass = `button ${classes.button}`

  if(props.postData.post.id % 2 === 0) {
    postClass = `${classes.post} ${classes['post--gold']}`;
    tagsClass = `${classes['post__tags']} ${classes['post__tags--gold']}`;
    buttonClass = `button ${classes.button} ${classes['button--gold']}`
  }

  const commentsHandler = () => {
    setShowComments(state => !state);
  }

  let button = <Link to='comments' className={buttonClass} onClick={commentsHandler}>{showComments ? 'Hide Comments' : 'Show Comments'}</Link>;

  if(showComments) {
    button = <Link to='..' relative='path' className={buttonClass} onClick={commentsHandler}>{showComments ? 'Hide Comments' : 'Show Comments'}</Link>;
  }

  const postTags = props.postData.post.tags;
  const postTitle = props.postData.post.title;
  const postBody = props.postData.post.body;
  const user = props.postData.user.username
  
  return (
    <div className={postClass}>
      <span className={tagsClass}>{postTags.join(", ")}</span>
    <h3 className={classes['post__title']}>{postTitle}</h3>
    <p className={classes['post__text']}>{postBody}</p>
    <span  className={classes['post__author']}>author: <strong>{user}</strong></span>
    {button}
    </div>
  )
}

export default BlogPostDetail;