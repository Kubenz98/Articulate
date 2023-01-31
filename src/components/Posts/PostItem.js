import React from "react";
import classes from "./PostItem.module.scss";
import { useState, useEffect } from "react";
import textTruncate from "../../helpers/textTruncate";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ref as dbRef, get, child, update, set } from "firebase/database";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const Post = (props) => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (props.imageLink) {
      const img = new Image();
      img.src = props.imageLink;
      img.onload = () => setImage(img);
    }
  }, [props.imageLink]);
  const text = textTruncate(props.body, 50);

  const AddToMainHandler = async () => {
    const oldRef = `queue/${props.id}`;
    await get(child(dbRef(db), oldRef))
      .then(async (post) => {
        
        const data = post.val();
        const mainUpdates = {};
        mainUpdates[`main/${props.id}`] = data;
        await update(dbRef(db), mainUpdates);

        set(dbRef(db, oldRef), null);
        navigate("/posts?page=1");
      })
      .catch((err) => {
        throw new Error("postError");
      });
  };

  return image || !props.imageLink ? (
    <li className={classes["list-item"]}>
      <Link to={`/posts/${props.id.toString()}`} className={classes.post}>
        <p className={classes["post__tags"]}>{props.tags}</p>
        {props.imageLink && (
          <div className={classes["post__image"]}>
            <img src={props.imageLink} alt="img" />
          </div>
        )}
        <h3 className={classes["post__title"]}>{props.title}</h3>
        <p className={classes["post__text"]}>{text}</p>
      </Link>
      {auth?.currentUser?.uid === "zO2cporaARafP5FuZYiddia5Meg2" &&
        location.pathname === "/posts/queue" && (
          <button
            className={classes["list-item__button"]}
            onClick={AddToMainHandler}
          >
            +
          </button>
        )}
    </li>
  ) : (
    <LoadingSpinner />
  );
};

export default React.memo(Post);
