import { Link } from "react-router-dom";
import classes from "./ConfirmEmail.module.scss"

const AfterSignUp = () => {
  return (
    <>
      <h1 className={classes.title}>Please, confirm your e-mail address</h1>
      <p className={classes.text}>Confirmation of email address allows for posting and commenting. Just click on the link that is in the e-mail from Articulate and sign in.</p>
      <Link to={'../'} className='button button--link'>Go to main page</Link>
    </>
  );
};

export default AfterSignUp;
