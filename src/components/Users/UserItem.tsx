import React, { useState, useEffect } from "react";
import classes from "./UserItem.module.scss";
import { Link } from "react-router-dom";

import { User } from "src/ts/userInterfaces";
import LoadingUserSkeleton from "../LoadingSkeleton/LoadingUserSkeleton";

const UserItem = (props: User) => {
  const [image, setImage] = useState<null | HTMLImageElement>(null);

  useEffect(() => {
    if (props.profile_picture) {
      const img = new Image();
      img.src = props.profile_picture;
      img.alt = 'avatar'
      img.onload = () => setImage(img);
    }
  }, [props.profile_picture]);
  return image ? (
    <li className={classes.item}>
      <Link to={props.userId.toString()} className={classes.user}>
        <div className={classes["user__image"]}>
          <img src={image.src} alt={image.alt} />
        </div>
        <h3 className={classes["user__name"]}>{props.username}</h3>
      </Link>
    </li>
  ) : (<LoadingUserSkeleton loading={true} />);
};

export default React.memo(UserItem);
