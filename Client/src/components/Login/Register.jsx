import { useContext, useState } from "react";
import axios from "axios";
import Image from "./Image";
import "./Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Alert from "../Alert/Alert";
import NotFound from "../NotFound/NotFound";
import ModalPassword from "../ModalPassword/ModalPassword";
import UserContext from "../../context/actions/userContext";

const Register = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isRegisterClick, setIsRegisterClick] = useState(false);
  const [clickClose, setClickClose] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsRegister({
        fullName: currentUser.fullName,
        email: currentUser.email,
        password: "",
      });
    }
  }, []);

  if (id && localStorage.getItem("id") !== id) {
    return <NotFound />;
  }

  // cs_test_a1Sg9ntb06jELBxIfqBOUvTfwjullXS4jtdkjm4UWD38RqvdMVF5RTOJPY
  const handleChange = (e) => {
    const { name, value } = e.target;

    setIsRegister((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setClickClose(true);

    if (isRegister.email && isRegister.fullName && isRegister.password) {
      if (id) {
        setClickClose(true);
      } else {
        const respond = await axios
          .post("http://localhost:8080/users", isRegister)
          .catch((e) => {
            setIsRegisterClick(true);
          });

        const id = respond.data.messages.id;

        delete isRegister.password;

        setCurrentUser(isRegister);

        localStorage.setItem("id", id);

        navigate("/home");
      }
    }
  };

  return (
    <>
      {id && (
        <ModalPassword
          clickClose={clickClose}
          setClickClose={setClickClose}
          id={id}
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
          <h2>{id ? "Edit Profile" : "Register"}</h2>
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
                value={`${id ? "Edit Profile" : "Register"}`}
                onClick={handleClick}
              />
              {!id && <Link to={"/login"}>Already have an Account?</Link>}
            </div>
          </form>
        </div>
        <Image />
      </div>
    </>
  );
};
export default Register;
