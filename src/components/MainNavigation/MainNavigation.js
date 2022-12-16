
import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.scss";


const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to='/'>Blog</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/' className={(link) => link.isActive ? classes.active : undefined}>Home</NavLink>
          </li>
          <li>
            <NavLink to='/blog' className={(link) => link.isActive ? classes.active : undefined}>Posts</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
