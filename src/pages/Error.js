import { useRouteError, Link } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "Something went wrong!";
  console.log(error);

  if (error?.data?.code === "auth/wrong-password") {
    message = "Wrong password.";
  } else if (error?.data?.code === "auth/user-not-found") {
    message = "User not found.";
  } else if (error?.data?.code === "auth/too-many-requests") {
    message = "Too much sign in attempts. Try again later.";
  } else if (error?.data?.code === "auth/email-already-exists") {
    message = "Provided email is already taken.";
  } else if (error?.data?.code === "auth/invalid-email") {
    message = "Provided email is incorrect.";
  } else if (error?.data?.code === "auth/invalid-password") {
    message = "Provided password is invalid.";
  } else if (error?.data?.code === "auth/weak-password") {
    message = "Password must be at least six characters long.";
  } else if (error?.data?.code === "PERMISSION_DENIED") {
    message = "Permission denied.";
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
