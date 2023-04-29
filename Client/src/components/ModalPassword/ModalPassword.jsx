import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/actions/userContext";
import Alert from "../Alert/Alert";

const ModalPassword = ({ clickClose, setClickClose, id, isRegister }) => {
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const [isModalPasswordClick, setisModalPasswordClick] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handlePassword = (e) => {
    const { value } = e.target;

    setPassword(value);
  };

  const handleClickPassword = async () => {
    await axios
      .post("http://localhost:8080/users/verify", {
        password,
        email: currentUser.email,
      })
      .catch((error) => {
        const messages = error.response.data.messages.messages.failed;
        setTextError(messages);
        setisModalPasswordClick(true);
      });

    setClickClose(false);

    if (id) {
      await axios
        .patch(`http://localhost:8080/users/${id}`, {
          fullName: isRegister.fullName,
          email: isRegister.email,
          password: isRegister.password,
        })
        .catch((err) => {
          const messages = err.response.data.messages.messages.failed;
          setTextError(messages);
          setisModalPasswordClick(true);
        });

      delete isRegister.password;

      setCurrentUser(isRegister);
      navigate("/home");
    } else {
      await axios
        .delete(`http://localhost:8080/users/${currentUser.id}`)
        .catch((err) => {
          const messages = err.response.data.messages.error;

          setTextError(messages);
          setisModalPasswordClick(true);
        });

      setCurrentUser({});
      localStorage.clear();
    }
  };

  return (
    <>
      {isModalPasswordClick && (
        <Alert
          Text={textError}
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
