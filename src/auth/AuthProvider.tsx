import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../helpers/Urls";
import { IAuthContext } from "../interfaces/Interfaces";

// Create the context
export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: any) => {
  // Define all variables and functions to be passed down to children
  const [signedIn, setSignedIn] = useState(false);
  const admin = localStorage.getItem("isAdmin") === "true";
  const defaultUser = localStorage.getItem("isAdmin") === "false";
  
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

  const handleLogin = (username: string, isAdmin: string) => {
    setSignedIn(true);
    localStorage.setItem("signedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("isAdmin", isAdmin);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        API_URL("logout"),
        { body: "empty" },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setSignedIn(false);
        //setIsAdmin("");
        localStorage.removeItem("signedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Gathers them in a variable we can pass as a value to the children
  const provider = {
    signedIn,
    //isAdmin,
    admin,
    defaultUser,
    handleLogin,
    handleLogout,
    auth,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
