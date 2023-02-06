import React from "react";
import classes from "./UserItem.module.scss";
import { Link } from "react-router-dom";

import { User } from "src/ts/userInterfaces";

const UserItem = (props: User) => {
  
  return (
    <li className={classes.item}>
      <Link to={props.userId.toString()} className={classes.user}>
        <div className={classes["user__image"]}>
          <img src={props.profile_picture} alt="avatar" />
        </div>
        <h3 className={classes["user__name"]}>
          {props.username}
        </h3>
      </Link>
    </li>
  );
};

export default React.memo(UserItem);
