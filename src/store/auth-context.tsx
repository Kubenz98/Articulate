import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { User } from "firebase/auth";

interface Context {
  isLoggedIn: boolean;
  currentUser: User | null;
}

interface Props {
  children?: React.ReactNode;
}

const AuthContext = React.createContext<Context>({
  isLoggedIn: false,
  currentUser: null,
});

export const AuthContextProvider = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else setCurrentUser(null);
    });
    return unsubscribe;
  }, []);

  const isLoggedIn = !!currentUser;

  const contextValue: Context = {
    isLoggedIn,
    currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
