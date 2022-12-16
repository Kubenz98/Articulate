import CommentItem from "./CommentItem";

const Comments = (props) => {

  const comments = props.data.comments;

  return (
    <div>
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
