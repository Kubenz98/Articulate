import React from "react";
import { Link, useNavigation, Navigate } from "react-router-dom";
import classes from "./Welcome.module.scss";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Authentication from "../Auth/Authentication";

const Welcome = () => {
  const [user, loading] = useAuthState(auth);
  const navigation = useNavigation();

  if (loading) return <LoadingSpinner />;

  if (!loading && user) {
    return <Navigate to="/posts?page=1" replace={true} />;
  }

  return (
    <div className={classes.welcome}>
      <div className={classes["welcome__description"]}>
        <h1 className={classes["welcome__description-logo"]}>Articulate</h1>
        <p className={classes["welcome__description-text"]}>
          On Articulate users publishes various articles from different fields
          of life, written by different authors.
        </p>
      </div>
      <div className={classes["welcome__log-in"]}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Authentication submitting={navigation.state === "submitting"} />
            <div className={classes.separator}>
              <p>or</p>
              <Link to="posts?page=1" className={classes.link}>
                Enter as a guest
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Welcome;
