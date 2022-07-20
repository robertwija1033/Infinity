import "./Login.css";
import Image from "./Image";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

const Login = () => {
  const [isLogin, setIsLogin] = useState({
    email: "",
    password: "",
    url: "http://localhost:3000/login",
  });
  const [isLoginClick, setIsLoginClick] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIsLogin((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/UAS/Infinity/Server/client/index.php", isLogin)
      .then((result) => {
        if (result.data.id) {
          window.localStorage.setItem("id", result.data.id);
          window.localStorage.setItem("email", result.data.email);
          window.localStorage.setItem("fullName", result.data.fullName);
          if (localStorage.getItem("email") === "robertwijaya1033@gmail.com") {
            navigate("/dashboard");
          } else {
            navigate("/home");
          }
        } else {
          setIsLoginClick(true);
        }
      });
  };

  return (
    <>
      {isLoginClick && (
        <Alert
          Text={"You must check your password and your email"}
          AlertStyle={{
            border: "1px solid #f5c2c7",
            backgroundColor: "#F8D7DA",
            color: "#842029",
          }}
          IconStyle={"#842029"}
          Icon={"bi bi-exclamation-circle-fill"}
          Expression={isLoginClick}
          setExpression={setIsLoginClick}
        />
      )}
      <div className="container-login">
        <div className="login">
          <h2>Login</h2>
        </div>
        <div className="container">
          <form autoComplete="new-password">
            <div className="input-box">
              <i className="fas fa-at"></i>
              <input
                type="email"
                required="required"
                onChange={handleChange}
                name="email"
                value={isLogin.email}
                autocomplete="false"
                onfocus="this.removeAttribute('readonly');"
              />
              <span>Email Address</span>
            </div>
            <div className="input-box">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                required="required"
                onChange={handleChange}
                name="password"
                value={isLogin.password}
                autoComplete="nope"
              />
              <span>Password</span>
            </div>
            <div className="input-box">
              <input
                type="submit"
                value="Login"
                required="required"
                onClick={handleClick}
              />
              <Link to={"/register"}>Not have an Account?</Link>
            </div>
          </form>
        </div>
        <Image />
      </div>
    </>
  );
};

export default Login;
