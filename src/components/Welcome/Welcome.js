import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Welcome.module.scss";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <LoadingSpinner />;

  return (
    <div className={classes.welcome}>
      <h1 className={classes.title}>
        Welcome{" "}
        {authCtx.isLoggedIn &&
          (authCtx.currentUser.displayName || authCtx.currentUser.email)}
        !
      </h1>
      {!auth.currentUser && (
        <Link to="/login" className="link">
          Click here to login or sign up!
        </Link>
      )}
        <p className={classes.text}>
          Articulate is a webpage, where users can publish their own posts about
          various topics. From travel to health and beauty to entertainment and
          social issues, we have something for everyone. Our community is made
          up of people from all over the world who share their experiences and
          perspectives. Join us and start sharing your thoughts with others!
        </p>
        </div>
  );
};

export default Welcome;
