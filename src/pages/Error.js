import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";

const ErrorPage = () => {

  const error = useRouteError();
  
  
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Error was occured!</h1>
        <p className="error">{error.message}</p>
      </main>
    </>
  );
};

export default ErrorPage;
