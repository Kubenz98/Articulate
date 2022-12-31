import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";

const AddPost = (props) => {
  const action = useActionData();

  const [error, setError] = useState(null);

  useEffect(() => {
    setError(action);
  }, [action]);

  return (
    <Form className='form' method="post">
      <div className='form__controls'>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required minLength={3} />
      </div>
      <div className='form__controls'>
        <label htmlFor="tags">Tags (separated by commas)</label>
        <input id="tags" name="tags" required />
      </div>
      <div className='form__controls'>
        <label htmlFor="text">Text</label>
        <textarea id="text" name="text" rows={10} required minLength={10} />
      </div>
      {error && <p className="error-form">{error}</p>}
      <div className='form__actions'>
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
