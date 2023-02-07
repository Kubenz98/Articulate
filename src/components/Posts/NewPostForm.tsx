import React, { useState, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface FormProps {
  onCancel: () => void;
  submitting: boolean
}

const NewPostForm = (props: FormProps) => {
  const action = useActionData() as string | null;
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(action);
  }, [action]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, navigate, user]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 style={{margin: '10px auto'}}>Add New Post</h1>
      {!user!.emailVerified && !loading && (
        <h4 className="confirm-error">
          Only users with a confirmed email address can post. If you see this
          message, please confirm your email address or if you have already done
          so, log out and log in again.
        </h4>
      )}
      <Form className="form" method="post" encType="multipart/form-data">
        <div className="form__controls">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required minLength={3} maxLength={65} />
        </div>
        <div className="form__controls">
          <label htmlFor="tags">Tags (separated by commas)</label>
          <input id="tags" name="tags" required maxLength={30} />
        </div>
        <div className="form__controls">
          <label htmlFor="text">Text</label>
          <textarea id="text" name="text" rows={10} required minLength={10} />
        </div>
        <div className="form__controls">
          <label htmlFor="image">Image (max size 500kb)</label>
          <input
            id="image"
            name="image"
            style={{paddingLeft: '0'}}
            type="file"
            accept="image/png, image/jpeg"
          />
          <p style={{marginTop: '5px'}}>If you don't have an image, the default image will be set. Recommended 16:9 aspect ratio.</p>
        </div>
        {error && <p className="error-form">{error}</p>}
        <div className="form__actions">
          <button
            type="button"
            className="button button--link"
            onClick={props.onCancel}
          >
            Close
          </button>
          <button
            type="submit"
            className="button button--link"
            disabled={!user!.emailVerified || props.submitting}
          >
            {props.submitting ? "Submitting..." : "Add Post"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default NewPostForm;
