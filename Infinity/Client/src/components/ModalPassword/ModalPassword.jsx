import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

const ModalPassword = ({
  clickClose,
  setClickClose,
  auth,
  email,
  isRegister,
}) => {
  const [password, setPassword] = useState({
    passwordUser: "",
  });
  const [isModalPasswordClick, setisModalPasswordClick] = useState(false);

  const navigate = useNavigate();

  const handlePassword = (e) => {
    const { value } = e.target;

    setPassword((prevPassword) => ({
      ...prevPassword,
      ["passwordUser"]: value,
    }));
  };

  const handleClickPassword = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/index.php", {
        url: "Navbar/handleClickPassword",
        password: password.passwordUser,
        email: email || auth,
      })
      .then(function (response) {
        if (response.data.status === undefined && response.data.status !== 0) {
          setClickClose(false);
          if (
            email &&
            isRegister.email &&
            isRegister.fullName &&
            isRegister.password
          ) {
            axios
              .post(
                "http://localhost/UAS/Infinity/Server/client/index.php",
                isRegister
              )
              .then(function (response) {
                if (
                  response.data.status === undefined &&
                  response.data.status !== 0
                ) {
                  window.localStorage.setItem("email", response.data[0].email);
                  window.localStorage.setItem(
                    "fullName",
                    response.data[0].fullName
                  );
                  navigate("/home");
                }
              });
          } else {
            axios
              .post("http://localhost/UAS/Infinity/Server/client/index.php", {
                url: "http://localhost:3000/navbar/delete",
                id: localStorage.getItem("id"),
              })
              .then(function (response) {
                localStorage.clear();
                window.location.reload();
              });
          }
        } else {
          setisModalPasswordClick(true);
        }
      });
  };

  return (
    <>
      {isModalPasswordClick && (
        <Alert
          Text={"You're is wrong, Please input the right password!"}
          AlertStyle={{
            border: "1px solid #f5c2c7",
            backgroundColor: "#F8D7DA",
            color: "#842029",
            zIndex: "10",
          }}
          IconStyle={"#842029"}
          Icon={"bi bi-exclamation-circle-fill"}
          Expression={isModalPasswordClick}
          setExpression={setisModalPasswordClick}
        />
      )}

      <div className="a-message" style={{ zIndex: clickClose ? "100" : "-3" }}>
        <div
          className="message"
          style={{ display: `${clickClose ? "flex" : "none"}` }}
        >
          <div className="close">
            <span onClick={() => setClickClose(false)}>x</span>
          </div>
          <label>Masukkan Password Anda : </label>
          <input
            type={"password"}
            autoComplete="new-password"
            value={password.passwordUser}
            onChange={handlePassword}
          />
          <div className="message-button">
            <button type="submit" onClick={handleClickPassword}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPassword;
