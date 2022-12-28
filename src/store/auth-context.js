import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext({
  isLoggedIn: false,
  currentUser: "",
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else setCurrentUser(null);
    });
    return unsubscribe;
  }, []);

  const isLoggedIn = !!currentUser;

  const contextValue = {
    currentUser,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
