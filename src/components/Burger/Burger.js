import classes from "./Burger.module.scss";

const Burger = (props) => {
  return (
    <div
      className={
        props.navState
          ? `${classes.hamburger} ${classes["hamburger--active"]}`
          : classes.hamburger
      }
    >
      <div className={classes["hamburger__bars"]} onClick={props.navHandler}>
        <span className={classes["hamburger__bars-bar"]}></span>
        <span className={classes["hamburger__bars-bar"]}></span>
        <span className={classes["hamburger__bars-bar"]}></span>
      </div>
    </div>
  );
};

export default Burger;
