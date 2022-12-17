import CommentItem from "./CommentItem";

const Comments = (props) => {

  const comments = props.data.comments;
  
  if(comments.length === 0) {
    return <p>No comments added yet.</p>
  }
  
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            userName={comment.user.username}
            userId={comment.user.id}
            comment={comment.body}
          />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
