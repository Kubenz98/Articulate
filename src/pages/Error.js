import { useRouteError, Link } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";

const ErrorPage = () => {

  const error = useRouteError();
  
  
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Error was occured!</h1>
        <p className="error">{error.message}</p>
        <Link to={'../'} className='button button--link'>Go to main page</Link>
      </main>
    </>
  );
};

export default ErrorPage;
