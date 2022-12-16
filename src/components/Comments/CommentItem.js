import classes from "./CommentItem.module.scss"

const CommentItem = (props) => {
  
  
  return (
    <li className={classes.comment}>
      <h4>{props.userName}</h4>
      <p>{props.comment}</p>
    </li>
  );
};

export default CommentItem;
