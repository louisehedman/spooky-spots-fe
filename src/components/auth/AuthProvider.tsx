import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../../helpers/Urls";
import { IAuthContext } from "../../interfaces/Interfaces";

// Create the context
export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: any) => {
  // Define all variables and functions to be passed down to children
  const [signedIn, setSignedIn] = useState(false);
  const [role, setRole] = useState("")

  const admin = localStorage.getItem("role") === "1";
  const defaultUser = localStorage.getItem("role") === "0";
  
  useEffect(() => {
    const user = localStorage.getItem("signedIn");
    if (user === "true") {
      setSignedIn(true);
    }
    const userRole = localStorage.getItem("role");
    if (userRole !== "") {
      setRole(role);
    }
  }, []);

  const auth = () => {
    if (localStorage.getItem("signedIn")) {
      return true;
    }
    return false;
  };

  const handleLogin = (username: string, role: string) => {
    setSignedIn(true);
    localStorage.setItem("signedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
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
        localStorage.removeItem("signedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Gathers them in a variable we can pass as a value to the children
  const provider = {
    signedIn,
    role,
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
