import "./Login.css";
import Image from "./Image";
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import UserContext from "../../context/actions/userContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState({
    email: "",
    password: "",
  });

  const { setCurrentUser } = useContext(UserContext);

  const [isLoginClick, setIsLoginClick] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIsLogin((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let routes = "";

    if (isLogin.email === "robertwijaya1033@gmail.com") routes = "admin";
    else routes = "users";

    const respond = await axios
      .post(`http://localhost:8080/${routes}/verify`, isLogin)
      .catch(() => {
        setIsLoginClick(true);
      });

    const id = respond.data.messages.id;

    delete isLogin.password;

    setCurrentUser({
      ...isLogin,
      id: respond.data.messages.id,
      fullName: respond.data.messages.fullName,
    });

    window.localStorage.setItem("id", id);
    window.localStorage.setItem("routes", routes);

    if (routes === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      {isLoginClick && (
        <Alert
          Text={"You must check your Data"}
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
