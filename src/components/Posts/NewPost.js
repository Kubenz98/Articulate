import { useState, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const AddPost = (props) => {
  const action = useActionData();
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(action);
  }, [action]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, navigate, user]);

  return (
    <Form className="form" method="post" encType="multipart/form-data">
      <div className="form__controls">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required minLength={3} />
      </div>
      <div className="form__controls">
        <label htmlFor="tags">Tags (separated by commas)</label>
        <input id="tags" name="tags" required />
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
          type="file"
          accept="image/png, image/jpeg"
        />
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
          disabled={props.submitting}
        >
          {props.submitting ? "Submitting..." : "Add Post"}
        </button>
      </div>
    </Form>
  );
};

export default AddPost;
