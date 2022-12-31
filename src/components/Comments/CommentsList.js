import { useRef } from "react";
import { Form } from "react-router-dom";
import CommentItem from "./CommentItem";
import { useActionData } from "react-router-dom";

const Comments = (props) => {

  const reset = useActionData();
  const comments = props.data;
  const commentRef = useRef();

  const cleanTextArea = () => {
    commentRef.current.value = ''
  }

  if(reset) cleanTextArea();
  
  return (
    <div>
      <Form className="form" method="post" style={{'marginBottom' : '30px'}}>
        <div className="form__controls">
          <textarea
            id="comment"
            name="comment"
            rows={3}
            required
            placeholder="write a comment here"
            ref={commentRef}
          />
        </div>
        <div className="form__actions">
          <button
            type="submit"
            className="button button--link"
            disabled={props.submitting}
          >
            {props.submitting ? "Submitting..." : "Add Comment"}
          </button>
        </div>
      </Form>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              userName={comment.username}
              userId={comment.uid}
              comment={comment.body}
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
