//creating a context
import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//exporting the context itself
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//context provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = { currentUser, setCurrentUser };

  //stops listener if component unmounts
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //signed in = store user object, signed out = store null
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  //will wrap around components that need access to values inside
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
