import React from "react";
import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    if (error.data.code === "auth/wrong-password") {
      message = "Wrong password.";
    } else if (error.data.code === "auth/user-not-found") {
      message = "User not found.";
    } else if (error.data.code === "auth/too-many-requests") {
      message = "Too much sign in attempts. Try again later.";
    } else if (error.data.code === "auth/email-already-exists") {
      message = "Provided email is already taken.";
    } else if (error.data.code === "auth/invalid-email") {
      message = "Provided email is incorrect.";
    } else if (error.data.code === "auth/invalid-password") {
      message = "Provided password is invalid.";
    } else if (error.data.code === "auth/weak-password") {
      message = "Password must be at least six characters long.";
    } else if (error.data.code === "PERMISSION_DENIED") {
      message = "Permission denied.";
    } else if (error.data.code.startsWith("auth/requests-from-referer")) {
      message = "Permission denied.";
    }
  } else {
    //custom errors
    if (error instanceof Error) {
      if (error.message === "postsError") {
        message = "Could not get posts.";
      } else if (error.message === "postError") {
        message = "Could not get post.";
      } else if (error.message === "commentLogin") {
        message = "Sign in to write a comment.";
      } else if (error.message === "getComments") {
        message = "Could not get comments.";
      } else if (
        error.message === "getUser" ||
        error.message === "userPostsError"
      ) {
        message = "Could not get user.";
      } else if (error?.message === "usersError") {
        message = "Could not get users.";
      }
    }
  }
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Error was occured!</h1>
        <p className="error">{message}</p>
        <Link to={"../"} className="button button--link">
          Go to main page
        </Link>
      </main>
    </>
  );
};

export default ErrorPage;
