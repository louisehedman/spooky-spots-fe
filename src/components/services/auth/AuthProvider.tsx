import { createContext, useEffect, useState } from "react";
import { IAuthContext } from "../../../interfaces/Interfaces";

// Create the context
export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: any) => {
  // Define all variables and functions to be passed down to children
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("signedIn");
    if (user === "true") {
      setSignedIn(true);
    }
  }, []);

  const auth = () => {
    if (localStorage.getItem("signedIn")) {
      return true;
    }
    return false;
  };

  const handleLogin = () => {
    setSignedIn(true);
    localStorage.setItem("signedIn", "true");
  };

// Gathers them in a variable we can pass as a value to the children
const provider = {
    signedIn,
    handleLogin,
    auth,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;