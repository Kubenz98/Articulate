import { useState, useRef, useEffect } from "react";
import { Form } from "react-router-dom";
import CommentItem from "./CommentItem";
import { useActionData } from "react-router-dom";

const Comments = (props) => {
  const action = useActionData();
  const comments = props.data;
  const commentRef = useRef();
  const [error, setError] = useState(null);

  const cleanComment = () => {
    commentRef.current.value = "";
    setError(null)
  };
 
  useEffect(() => {
    if (typeof action === "boolean") {
      cleanComment();
    } else setError(action);
  }, [action]);
  
  return (
    <div>
      {<Form className="form" method="post" style={{ marginBottom: "30px" }}>
        <div className="form__controls">
          <textarea
            id="comment"
            name="comment"
            rows={3}
            required
            minLength={3}
            placeholder={props.auth.currentUser ? "write a comment here" : "sign in to write comments"}
            ref={commentRef}
            disabled={props.auth.currentUser === null}
          />
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button
            type="submit"
            className="button button--link"
            disabled={props.submitting || !props.auth.currentUser}
          >
            {props.submitting ? "Submitting..." : "Add Comment"}
          </button>
        </div>
      </Form>}
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              userName={comment.username}
              userId={comment.uid}
              comment={comment.body}
              date={comment.date}
            />
          ))
        ) : (
          <p className="text">No comments added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;
