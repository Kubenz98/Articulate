import React from "react";
import classes from "./Searcher.module.scss";

interface SearcherProps {
  path: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Searcher = (props: SearcherProps) => {
  let title = "Main Posts";
  if (props.path === "/posts/queue") {
    title = "Posts Queue";
  } else if (props.path === "/users") {
    title = "Users";
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>
      {
        <input
          className={classes.searcher}
          onChange={props.onChange}
          type="text"
          placeholder={props.placeholder}
        />
      }
    </div>
  );
};

export default Searcher;
