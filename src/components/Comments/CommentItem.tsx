import React from "react";
import classes from "./CommentItem.module.scss";
import { useNavigate } from "react-router-dom";

interface ItemProps {
  user: string;
  body: string;
  date: number;
  uid: string;
}

const CommentItem = (props: ItemProps) => {
  const navigate = useNavigate();
  const date = new Date(props.date);

  const link = () => {
    navigate(`/users/${props.uid}`);
  };

  return (
    <li className={classes.comment}>
      <h4 onClick={link}>{props.user}</h4>
      <p>{props.body}</p>
      <span>{date.toLocaleString()}</span>
    </li>
  );
};

export default CommentItem;
