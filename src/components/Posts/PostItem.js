import React from "react";
import classes from "./PostItem.module.scss";
import { useNavigate } from "react-router-dom";

const Post = (props) => {
  const navigate = useNavigate();

  const link = () => {
    navigate(`/blog/${props.id.toString()}`);
  };
  return (
    <li className={classes.post} onClick={link}>
      <div>
        <p>{props.tags}</p>
        <h3>{props.title}</h3>
      </div>
    </li>
  );
};

export default React.memo(Post);
