import classes from "./CommentItem.module.scss"
import { useNavigate } from "react-router-dom";

const CommentItem = (props) => {

  const navigate = useNavigate();

  const link = () => {
    navigate(`/users/${props.userId}`)
  }
  
  
  return (
    <li className={classes.comment}>
      <h4 onClick={link}>{props.userName}</h4>
      <p>{props.comment}</p>
    </li>
  );
};

export default CommentItem;
