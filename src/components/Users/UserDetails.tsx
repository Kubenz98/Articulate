import React from "react";
import classes from "./UserProfile.module.scss";
import PostList from "../Posts/PostsList";

import { UserDetailsProps } from "src/ts/userInterfaces";

const UserDetails = (props: UserDetailsProps) => {
  return (
    <>
      <div className={classes.user}>
        <div className={classes["user__info"]}>
          <h1>User</h1>
          <div className={classes["user__info-avatar"]}>
            <img src={props.profile_picture} alt="avatar" />
          </div>
          <h3 className={classes["user__info-nick"]}>{props.username}</h3>
          <span className={classes["user__info-email"]}>
            &#9993; {props.email}
          </span>
        </div>
        <div className={classes["user__posts"]}>
          <h1 className={classes["user__posts-title"]}>User Posts</h1>
          <PostList data={props.posts} isOnUserProfile={true} />
        </div>
      </div>
    </>
  );
};

export default UserDetails;
