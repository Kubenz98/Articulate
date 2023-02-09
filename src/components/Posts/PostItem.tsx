import React from "react";
import classes from "./PostItem.module.scss";
import { useState, useEffect } from "react";
import textTruncate from "../../helpers/textTruncate";
import LoadingSkeleton from "../LoadingSkeleton/LoadingPostSkeleton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ref as dbRef, get, child, update, set } from "firebase/database";
import { db } from "../../firebase";
import { auth } from "../../firebase";

import { Post, PostsObj } from "src/ts/postInterfaces";

interface itemProps {
  key: string | undefined;
  title: string;
  tags: string;
  body: string;
  id?: string;
  date?: number;
  user?: string;
  uid?: string;
  imageLink: string;
}

const PostItem = (props: itemProps) => {
  const [image, setImage] = useState<null | HTMLImageElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (props.imageLink) {
      const img = new Image();
      img.src = props.imageLink;
      img.alt = "avatar";
      img.onload = () => setImage(img);
    }
  }, [props.imageLink]);
  const text = textTruncate(props.body, 50);

  const AddToMainHandler = async () => {
    const oldRef = `queue/${props.id}`;
    await get(child(dbRef(db), oldRef))
      .then(async (post) => {
        const data: Post = post.val();
        const mainUpdates: PostsObj = {};
        mainUpdates[`main/${props.id}`] = data;
        await update(dbRef(db), mainUpdates);

        set(dbRef(db, oldRef), null);
        navigate("/posts?page=1");
      })
      .catch((err) => {
        throw new Error("postError");
      });
  };
  return image ? (
    <li className={classes["list-item"]}>
      <Link to={`/posts/${props.id!.toString()}`} className={classes.post}>
        <p className={classes["post__tags"]}>{props.tags}</p>
       <div className={classes["post__image"]}>
       <img src={image.src} alt={image.alt} />
     </div>
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
    <LoadingSkeleton loading={true} />
  );
};

export default React.memo(PostItem);
