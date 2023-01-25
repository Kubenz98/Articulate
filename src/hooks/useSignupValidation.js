import { useState, useEffect } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "../firebase";

const useSignupValidation = () => {
  const [usernames, setUsernames] = useState([]);
  const [username, setUsername] = useState({ name: "", exists: false });

  useEffect(() => {
    const lockedRef = dbRef(db, `/usernames`);
    onValue(lockedRef, (snapshot) => {
      const users = snapshot.val();
      return setUsernames(Object.keys(users));
    });
  }, []);

  const usernameHandler = (e) => {
    setUsername((prevState) => {
      return { ...prevState, name: e.target.value };
    });
    if (
      usernames.some(
        (name) => name.toLowerCase() === e.target.value.toLowerCase()
      )
    ) {
      setUsername((prevState) => {
        return { ...prevState, exists: true };
      });
    } else {
      setUsername((prevState) => {
        return { ...prevState, exists: false };
      });
    }
  };

  return { usernames, username, usernameHandler };
};

export default useSignupValidation;
