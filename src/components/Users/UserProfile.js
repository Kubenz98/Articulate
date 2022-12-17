import classes from "./UserProfile.module.scss";
import Blog from "../Blog/Blog";

const UserProfile = (props) => {
  
  return (
    <>
      <div className={classes.user}>
        <div className={classes["user__info"]}>
        <h1>User</h1>
          <div className={classes["user__info-avatar"]}>
            <img src={props.image} alt="avatar" />
          </div>
          <h3 className={classes["user__info-nick"]}>{props.username}</h3>
          <span className={classes['user__info-email']}>&#9993; {props.email}</span>
        </div>
        <div className={classes["user__posts"]}>
          <h1>User Posts</h1>
          <Blog data={props.posts} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
