import React, { useState, useRef, useEffect } from "react";
import { Form, useNavigation } from "react-router-dom";
import CommentItem from "./CommentItem";
import { useActionData } from "react-router-dom";

import { Comment } from "src/ts/commentInterfaces";
import { Auth } from "firebase/auth";

interface ListProps {
  data: Comment[];
  auth: Auth;
}

const Comments = (props: ListProps) => {
  const action = useActionData() as string | boolean;
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<null | string>(null);
  const navigation = useNavigation();
  const comments = props.data;

  const cleanComment = () => {
    commentRef.current!.value = "";
    setError(null);
  };

  useEffect(() => {
    if (navigation.state === "submitting") {
      cleanComment();
    }
  }, [navigation.state]);

  useEffect(() => {
    if (typeof action === "string") {
      setError(action);
    }
  }, [action]);

  return (
    <div>
      {
        <Form className="form" method="post" style={{ marginBottom: "30px" }}>
          <div className="form__controls">
            <textarea
              id="comment"
              name="comment"
              rows={3}
              required
              minLength={3}
              placeholder={
                props.auth.currentUser
                  ? "write a comment here"
                  : "sign in to write comments"
              }
              ref={commentRef}
              disabled={props.auth.currentUser === null}
            />
          </div>
          {error && <p className="error-form">{error}</p>}
          <div className="form__actions">
            <button
              type="submit"
              className="button button--link"
              disabled={
                navigation.state === "submitting" || !props.auth.currentUser
              }
            >
              {navigation.state === "submitting"
                ? "Submitting..."
                : "Add Comment"}
            </button>
          </div>
        </Form>
      }
      <ul>
        {comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <CommentItem
              key={comment.id}
              user={comment.user!}
              uid={comment.uid!}
              body={comment.body}
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
