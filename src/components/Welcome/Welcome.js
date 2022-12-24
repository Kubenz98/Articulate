import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Welcome.module.scss";

const Welcome = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <h1>Welcome!</h1>
      {!authCtx.isLoggedIn && (
        <Link to="/login" className={classes.a}>
          Click here to login or sign up!
        </Link>
      )}
      {authCtx.isLoggedIn && <p>Check out the latest posts on the blog!</p>}
      {authCtx.isLoggedIn && <span className={classes.info}>logged in</span>}
      {authCtx.isLoggedIn && (
        <button className="button button--link" onClick={authCtx.logout}>
          logout
        </button>
      )}
    </>
  );
};

export default Welcome;
