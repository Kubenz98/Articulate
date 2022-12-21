import classes from "./NewPost.module.scss";
import { Form } from "react-router-dom";

const AddPost = (props) => {

  return (
    <Form className={classes.form} method="post">
      <div className={classes.controls}>
        <label htmlFor="title" >Title</label>
        <input id="title" name="title" required minLength={3} />
      </div>
      <div className={classes.controls}>
        <label htmlFor="tags">Tags (separated by commas)</label>
        <input id="tags" name="tags" />
      </div>
      <div className={classes.controls}>
        <label htmlFor="text">Text</label>
        <textarea id="text" name="text" rows={10} required minLength={10} />
      </div>
      <div className={classes.actions}>
        <button type="button" className="button button--link" onClick={props.onCancel}>
          Close
        </button>
        <button type="submit" className="button button--link" disabled={props.submitting}>
         {props.submitting ? 'Submitting...' : 'Add Post'}
        </button>
      </div>
    </Form>
  );
};

export default AddPost;
