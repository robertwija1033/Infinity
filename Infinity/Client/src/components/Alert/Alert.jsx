import { useState } from "react";
import "./Alert.css";

const Alert = ({
  Text,
  AlertStyle,
  Expression,
  IconStyle,
  Icon,
  setExpression,
}) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className={Expression ? "container-alert active" : "container-alert"}>
      <div
        className={
          setExpression
            ? !Expression
              ? "alert active"
              : "alert"
            : isClick
            ? "alert active"
            : "alert"
        }
        style={AlertStyle}
      >
        <div className="alert-text">
          <i className={Icon} style={{ color: IconStyle }}></i>
          {Text}
        </div>
        <div className="alert-button">
          {setExpression ? (
            <i
              className="bi bi-x-lg"
              onClick={() => setExpression(!Expression)}
            ></i>
          ) : (
            <i className="bi bi-x-lg" onClick={() => setIsClick(true)}></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
