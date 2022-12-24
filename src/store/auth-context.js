import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});


export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    clearTimeout(logoutTimer);
  }, []);
  const loginHandler = (token, expirationTime) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = expirationTime - Date.now();
    console.log(remainingTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
    setToken(token);
  };

  useEffect(() => {
    if (token) {
      let timeLeft = localStorage.getItem("expirationTime") - Date.now();
      if (timeLeft < 6000) timeLeft = 0;
      logoutTimer = setTimeout(logoutHandler, timeLeft);
    }
  }, [token, logoutHandler]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
