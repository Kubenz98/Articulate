import classes from "./Post.module.scss";
import { useNavigate } from "react-router-dom";

const BlogPost = (props) => {

  const navigate = useNavigate();

  const link = () => {
    navigate(`/blog/${props.id.toString()}`);
  };
  return (
    <li className={classes.post} onClick={link}>
      <div>
        <p>{props.tags.join(", ")}</p>
        <h3>{props.title}</h3>
      </div>
    </li>
  );
};

export default BlogPost;
