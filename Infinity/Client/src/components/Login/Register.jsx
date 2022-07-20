import { useState } from "react";
import axios from "axios";
import Image from "./Image";
import "./Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Alert from "../Alert/Alert";
import NotFound from "../NotFound/NotFound";
import ModalPassword from "../ModalPassword/ModalPassword";

const Register = (props) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    url: "http://localhost:3000/register",
  });
  const [isRegisterClick, setIsRegisterClick] = useState(false);
  const [clickClose, setClickClose] = useState(false);

  const { email } = useParams();

  useEffect(() => {
    if (email) {
      axios
        .post("http://localhost/UAS/Infinity/Server/client/index.php", {
          url: "Register/useEffect",
          email,
        })
        .then(function (response) {
          const innerValue = response.data[0];
          setIsRegister({
            fullName: innerValue.fullName,
            email: innerValue.email,
            password: "",
            url: "Register/handleClick",
          });
        });
    }

    return () => {
      setIsRegister({
        fullName: "",
        email: "",
        password: "",
        url: "http://localhost:3000/register",
      });
    };
  }, [email]);

  if (email && localStorage.getItem("email") !== email) {
    return <NotFound />;
  }

  // cs_test_a1Sg9ntb06jELBxIfqBOUvTfwjullXS4jtdkjm4UWD38RqvdMVF5RTOJPY
  const handleChange = (e) => {
    console.log(props.authentication);
    const { name, value } = e.target;

    setIsRegister((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (isRegister.email && isRegister.fullName && isRegister.password) {
      if (email) {
        setClickClose(true);
      } else {
        axios
          .post(
            "http://localhost/UAS/Infinity/Server/client/index.php",
            isRegister
          )
          .then((result) => {
            if (result.data !== "Invalid email format" && result.data) {
              window.localStorage.setItem("id", result.data[0].id);
              window.localStorage.setItem("email", result.data[0].email);
              window.localStorage.setItem("fullName", result.data[0].fullName);
              navigate("/home");
            } else {
              console.log(result);
            }
          });
      }
    } else {
      setIsRegisterClick(true);
    }
  };

  return (
    <>
      {email && (
        <ModalPassword
          clickClose={clickClose}
          setClickClose={setClickClose}
          email={email}
          isRegister={isRegister}
        />
      )}

      {isRegisterClick && (
        <Alert
          Text={"You must input all your gmail, fullName and Password"}
          AlertStyle={{
            border: "1px solid #f5c2c7",
            backgroundColor: "#F8D7DA",
            color: "#842029",
          }}
          IconStyle={"#842029"}
          Icon={"bi bi-exclamation-circle-fill"}
          Expression={isRegisterClick}
          setExpression={setIsRegisterClick}
        />
      )}
      
      <div className="container-login">
        <div className="login">
          <h2>{email ? "Edit Profile" : "Register"}</h2>
        </div>
        <div className="container">
          <form>
            <div className="input-box">
              <i className="fas fa-user"></i>
              <input
                name="fullName"
                type="text"
                required="required"
                value={isRegister.fullName}
                onChange={handleChange}
              />
              <span>Full Name</span>
            </div>
            <div className="input-box">
              <i className="fas fa-at"></i>
              <input
                name="email"
                type="email"
                required="required"
                value={isRegister.email}
                onChange={handleChange}
                autoComplete="off"
              />
              <span>Email Address</span>
            </div>
            <div className="input-box">
              <i className="fas fa-lock"></i>
              <input
                name="password"
                type="password"
                required="required"
                value={isRegister.password}
                onChange={handleChange}
                autoComplete="off"
              />
              <span>Password</span>
            </div>
            <div className="input-box">
              <input
                type="submit"
                value={`${email ? "Edit Profile" : "Register"}`}
                onClick={handleClick}
              />
              {!email && <Link to={"/login"}>Already have an Account?</Link>}
            </div>
          </form>
        </div>
        <Image />
      </div>
    </>
  );
};
export default Register;
