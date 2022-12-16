import { useLoaderData } from "react-router-dom";
import { getPostComments } from "../../utils/api";
import CommentItem from "./CommentItem";
import classes from "./Comments.module.scss";
const Comments = () => {
  const loadedData = useLoaderData();
  const comments = loadedData.comments;
  
  return (
    <div className={classes.comments}>
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            userName={comment.user.username}
            comment={comment.body}
            user={comment.user.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default Comments;

export function loader({ params }) {
  return getPostComments(params.id);
}
