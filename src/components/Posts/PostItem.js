import React from "react";
import classes from "./PostItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import textTruncate from "../../helpers/textTruncate";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Post = (props) => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.imageLink) {
      const img = new Image();
      img.src = props.imageLink;
      img.onload = () => setImage(img);
    }
  }, [props.imageLink]);

  const link = () => {
    navigate(`/articles/${props.id.toString()}`);
  };

  const text = textTruncate(props.body, 50);
  
  return image || !props.imageLink ? (
    <li className={classes["list-item"]} onClick={link}>
      <div className={classes.post}>
        <p className={classes["post__tags"]}>{props.tags}</p>
        {props.imageLink && (
          <div className={classes["post__image"]}>
            <img src={props.imageLink} alt="img" />
          </div>
        )}
        <h3 className={classes["post__title"]}>{props.title}</h3>
        <p className={classes["post__text"]}>{text}</p>
      </div>
    </li>
  ) : (
    <LoadingSpinner />
  );
};

export default React.memo(Post);
