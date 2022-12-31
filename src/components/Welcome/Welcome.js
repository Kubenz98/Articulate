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
    <>
      <h1>Welcome {authCtx.isLoggedIn && (authCtx.currentUser.displayName || authCtx.currentUser.email)}!</h1>
      {!auth.currentUser && (
        <Link to="/login" className={classes.a}>
          Click here to login or sign up!
        </Link>
      )}
      {authCtx.isLoggedIn && <p>Check out the latest posts on the blog!</p>}

    </>
  );
};

export default Welcome;
