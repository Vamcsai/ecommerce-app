import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const currentAppLocation = useLocation();
  const userNav = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/authuser", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        userNav(currentAppLocation.pathname);
      })
      .catch((err) => {
        userNav("/login");
      });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
