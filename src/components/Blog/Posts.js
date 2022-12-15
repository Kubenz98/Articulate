import classes from "./Posts.module.scss"
import { Link } from "react-router-dom";
const BlogPost = (props) => {


  return (
    <li className={classes.post}>
      <Link to={props.id.toString()}>
      <p>{props.tags.join(", ")}</p>
      <h3>{props.title}</h3>
      </Link>
    </li>
  )
}

export default BlogPost;