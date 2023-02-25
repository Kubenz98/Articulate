import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Burger from "../Burger/Burger";
import classes from "./MainNavigation.module.scss";

import AuthContext from "../../store/auth-context";
import { auth } from "../../firebase";
import { logout } from "../../api/authApi";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  faGear,
  faHouse,
  faRightFromBracket,
  faRightToBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainNavigation = () => {
  const [navActive, setNavActive] = useState(false);
  const loading = useAuthState(auth)[1];
  const authCtx = useContext(AuthContext);

  library.add(faHouse, faUsers, faGear, faRightFromBracket, faRightToBracket);

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
    query: "(min-width: 830px)",
  });

  let navClassHori = `${classes.nav} ${classes["nav--horizontal"]}`;

  let navClassVert: string = navActive
    ? `${classes.nav} ${classes["nav--active"]}`
    : classes.nav;

  if (loading) return null;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/posts?page=1" onClick={closeNav}>
          Articulate
        </Link>
      </div>
      <Burger navState={navActive} navHandler={navHandler} />
      <nav className={navHorizontal ? navClassHori : navClassVert}>
        <ul>
          <li>
            <NavLink
              to="/posts?page=1"
              className={(link) => (link.isActive ? classes.active : undefined)}
              onClick={closeNav}
            >
              <FontAwesomeIcon icon="house" />
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
                <FontAwesomeIcon icon="gear" />
                Profile
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/users?page=1"
              className={(link) => (link.isActive ? classes.active : undefined)}
              onClick={closeNav}
            >
              <FontAwesomeIcon icon="users" />
              Users
            </NavLink>
          </li>
          {authCtx.isLoggedIn ? (
            <li>
              <NavLink to="/" onClick={logoutUser}>
                <FontAwesomeIcon icon="right-from-bracket" />
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
                <FontAwesomeIcon icon="right-to-bracket" />
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
