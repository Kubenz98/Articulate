import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Error was occured!</h1>
        <h3>status: {error.status}</h3>
        <p>{error.data}</p>
      </main>
    </>
  );
};

export default ErrorPage;
