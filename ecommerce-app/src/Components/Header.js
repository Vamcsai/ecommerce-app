import { useContext } from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Contexts/AuthContextProvider";
import axios from "axios";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const userNav = useNavigate();
  const signOut = async () => {
    await axios
      .get("http://localhost:3001/api/signout", { withCredentials: true })
      .then((res) => {
        setUser(null);
      })
      .catch((err) => {
        alert("Signout Failed...Try Again")
      });
  };
  return (
    <div className="header-container">
      <h1
        onClick={() => {
          userNav("/");
        }}
      >
        Book Store
      </h1>
      <button
        id="header-add-books"
        onClick={() => {
          userNav("/managebooks");
        }}
      >
        Manage Books
      </button>
      <button id="header-sign-out" onClick={signOut}>
        Signout
      </button>
    </div>
  );
}
