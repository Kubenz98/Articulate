import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Burger from "../Burger/Burger";
import classes from "./MainNavigation.module.scss";
import AuthContext from "../../store/auth-context";
import { auth } from "../../firebase";
import { logout } from "../../utils/api";

const MainNavigation = () => {
  const [navActive, setNavActive] = useState(false);

  const authCtx = useContext(AuthContext);

  const navHandler = () => {
    setNavActive((state) => !state);
  };

  const closeNav = () => {
    setNavActive(false);
  };

  const logoutUser = () => {
    setNavActive(false);
    logout(auth);
  };

  const navHorizontal = useMediaQuery({
    query: "(min-width: 700px)",
  });

  let navClassHori = `${classes.nav} ${classes["nav--horizontal"]}`;

  let navClassVert = navActive
    ? `${classes.nav} ${classes["nav--active"]}`
    : classes.nav;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/" onClick={closeNav}>
          Articulate
        </Link>
      </div>
      <Burger navState={navActive} navHandler={navHandler} />
      <nav className={navHorizontal ? navClassHori : navClassVert}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(link) => (link.isActive ? classes.active : undefined)}
              onClick={closeNav}
            >
              Home
            </NavLink>
          </li>
          {authCtx.isLoggedIn && (
            <li>
              <NavLink
                to="/profile"
                className={(link) =>
                  link.isActive ? classes.active : undefined
                }
                onClick={closeNav}
              >
                Profile
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/articles"
              className={(link) => (link.isActive ? classes.active : undefined)}
              onClick={closeNav}
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={(link) => (link.isActive ? classes.active : undefined)}
              onClick={closeNav}
            >
              Users
            </NavLink>
          </li>
          {authCtx.isLoggedIn ? (
            <li>
              <NavLink to="/" onClick={logoutUser}>
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={(link) =>
                  link.isActive ? classes.active : undefined
                }
                onClick={closeNav}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
