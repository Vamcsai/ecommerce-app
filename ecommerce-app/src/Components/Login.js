import "./Login.scss";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./Contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import loginLogo from "../Resources/logo-login.png"
export default function Login() {
  const userNav = useNavigate();
  const { user, setUser, isAuth, setIsAuth } = useContext(AuthContext);
  const [isFormOp, setIsFormOp] = useState(true);
  const [formOp, setFormOp] = useState("");
  const [ischecked, setischecked] = useState(false);
  const [signUpData, setSignUpData] = useState({
    signupusername: "",
    signuppassword: "",
    signuprole: "",
  });
  const [loginData, setLoginData] = useState({
    loginusername: "",
    loginpassword: "",
  });
  const signuphandleChange = (e1) => {
    setSignUpData({
      ...signUpData,
      [e1.target.name]: e1.target.value,
    });
  };
  const loginHandleChange = (e2) => {
    setLoginData({
      ...loginData,
      [e2.target.name]: e2.target.value,
    });
  };

  async function signUp(e) {
    e.preventDefault();

    const userSignup = {
      userdata: {
        username: signUpData.signupusername,
        password: signUpData.signuppassword,
        role: signUpData.signuprole,
      },
    };
    setSignUpData({
      signupusername: "",
      signuppassword: "",
      signuprole: "",
    });
    await axios
      .post("http://localhost:3001/api/signup", userSignup)
      .then((res) => {
        if (res) {
          setischecked(false);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  }

  async function userLogin(e) {
    e.preventDefault();
    const userLogin = {
      userdata: {
        username: loginData.loginusername,
        password: loginData.loginpassword,
      },
    };
    setLoginData({
      loginusername: "",
      loginpassword: "",
    });
    await axios
      .post("http://localhost:3001/api/login", userLogin, {
        withCredentials: true,
      })
      .then((res) => {
        userNav("/");
        setUser(res.data.result);
        setIsFormOp(false);
        setFormOp("");
      })
      .catch((err) => {
        if (err.response) {
          setIsFormOp(true);
          setFormOp(err.response.data.result);
        } else {
          setIsFormOp(true);
          setFormOp("Something went wrong...Try Again!");
        }
      });
  }

  return (
    <div className="form-outer-container">
      <div className="form-container">
        <input type="checkbox" checked={ischecked} readOnly id="check" />
        <div className="login form">
          <header> <span className="login-logo"> <img src={loginLogo} alt="Library" width="100%" className="login_image" /> </span></header>
          <form onSubmit={userLogin}>
            <input
              type="text"
              name="loginusername"
              onChange={loginHandleChange}
              value={loginData.loginusername}
              placeholder="Enter your email"
              required
            />
            <input
              type="text"
              name="loginpassword"
              onChange={loginHandleChange}
              value={loginData.loginpassword}
              placeholder="Enter your password"
              required
            />
            <a href="#">Forgot password?</a>
            <input type="submit" className="button" value="Login" />
          </form>
          <div className="signup-text">
            Don't have an account?
            <span onClick={() => setischecked(true)}> Signup</span>
          </div>
          {isFormOp ? <div className="signup-result">{formOp}</div> : <></>}
        </div>
        <div className="signup form">
          <header> <span className="login-logo"> <img src={loginLogo} alt="Library" width="100%" className="login_image" /> </span></header><form onSubmit={signUp}>
            <input
              type="text"
              name="signupusername"
              value={signUpData.signupusername}
              onChange={signuphandleChange}
              placeholder="Enter your Username"
              required
            />
            <input
              type="password"
              name="signuppassword"
              value={signUpData.signuppassword}
              onChange={signuphandleChange}
              placeholder="Enter your password"
              required
            />
            <select
              onChange={signuphandleChange}
              name="signuprole"
              value={signUpData.signuprole}
              required
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <input
              type="submit"
              id="signup-button"
              className="button"
              value="Signup"
            />
          </form>
          <div className="signup-text">
            Already have an account?
            <span onClick={() => setischecked(false)}> Login</span>
          </div>
          {isFormOp ? <div className="signup-result">{formOp}</div> : <></>}
        </div>
      </div>
    </div>
  );
}
