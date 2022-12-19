import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./PostDetail.module.scss"

const BlogPostDetail = (props) => {
    
  const [showComments, setShowComments] = useState(false);

  const commentsHandler = () => {
    setShowComments(state => !state);
  }

  const buttonClass = `button ${classes.button}`;

  let button = <Link to='comments' className={buttonClass} onClick={commentsHandler}>{showComments ? 'Hide Comments' : 'Show Comments'}</Link>;

  if(showComments) {
    button = <Link to='..' relative='path' className={buttonClass} onClick={commentsHandler}>{showComments ? 'Hide Comments' : 'Show Comments'}</Link>;
  }

  const postTags = props.postData.post.tags;
  const postTitle = props.postData.post.title;
  const postBody = props.postData.post.body;
  const user = props.postData.user.username;
  const userId = props.postData.user.id;
  
  
  return (
    <div className={classes.post}>
      <span className={classes['post__tags']}>{postTags.join(", ")}</span>
    <h3 className={classes['post__title']}>{postTitle}</h3>
    <p className={classes['post__text']}>{postBody}</p>
    <Link to={`/users/${userId}`} relative='route' className={classes['post__author']}>author: <strong>{user}</strong></Link>
    {button}
    </div>
  )
}

export default BlogPostDetail;