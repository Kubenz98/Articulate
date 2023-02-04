import React, { useState, useEffect } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "../firebase";
import { Username } from "src/ts/userInterfaces";

const useUsernameValidation = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [username, setUsername] = useState<Username>({ name: "", exists: false });

  useEffect(() => {
    const lockedRef = dbRef(db, `/usernames`);
    onValue(lockedRef, (snapshot) => {
      const users: string[] = snapshot.val();
      return setUsernames(Object.keys(users));
    });
  }, []);

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default useUsernameValidation;
