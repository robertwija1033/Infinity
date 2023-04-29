import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { convertToCurrency } from "../Home/convertToCurrency";
import Alert from "../Alert/Alert";
import CartContext from "../../context/actions/cart/cartContext";
import UserContext from "../../context/actions/userContext";

const Checkout = () => {
  const [checkout, setCheckout] = useState({
    fullName: "",
    province: "",
    city: "",
    districts: "",
    postalCode: "",
    address: "",
    mobilePhone: "",
  });
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { totalPrice, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCheckout({
      fullName: currentUser.fullName,
      province: currentUser.province,
      city: currentUser.city,
      districts: currentUser.districts,
      postalCode: currentUser.postalCode,
      address: currentUser.address,
      mobilePhone: currentUser.mobilePhone,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCheckout((prevCheckout) => ({ ...prevCheckout, [name]: value }));
  };

  const handleClick = async () => {
    const response = await axios
      .patch(`http://localhost:8080/users/${currentUser.id}`, {
        ...checkout,
        email: currentUser.email,
      })
      .catch((err) => {
        console.log(err);
      });

    setCurrentUser(checkout);

    navigate("/payment");

    console.log(response);
  };

  return (
    <>
      {cartItems.length ? null : (
        <Alert
          Text={"You don't have any Cart, Please Add To Cart on Detail Page!"}
          AlertStyle={{
            border: "1px solid #f5c2c7",
            backgroundColor: "#F8D7DA",
            color: "#842029",
          }}
          IconStyle={"#842029"}
          Icon={"bi bi-exclamation-circle-fill"}
          Expression={false}
        />
      )}
      <div className="checkout">
        <div className="name">
          <a onClick={() => navigate("/cart")}>Back</a>/Checkout
        </div>
        <div className="address">
          <p>Billing Address</p>
        </div>
        <div className="container-input">
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Full Name"}
              onChange={handleChange}
              name="fullName"
              value={checkout.fullName}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Province"}
              onChange={handleChange}
              name="province"
              value={checkout.province}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"City"}
              onChange={handleChange}
              name="city"
              value={checkout.city}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Districts"}
              onChange={handleChange}
              name="districts"
              value={checkout.districts}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Postal Code"}
              onChange={handleChange}
              name="postalCode"
              value={checkout.postalCode}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Address"}
              onChange={handleChange}
              name="address"
              value={checkout.address}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Mobile Phone"}
              onChange={handleChange}
              name="mobilePhone"
              value={checkout.mobilePhone}
            />
          </div>
        </div>
        <div className="detail">
          <div className="order">
            <h3>Order Details</h3>
          </div>
          {cartItems.map((item) => (
            <div className="order-details">
              <img src={`${item.image}`} />
              <h5>{item.nameProduct}</h5>
              <p>{convertToCurrency(item.price * item.quantity)}</p>
              <p className="qty">{item.quantity} X</p>
            </div>
          ))}
        </div>
      </div>
      <div className="summary">
        <div className="name">
          <h1>Summary</h1>
        </div>
        <div className="total">
          <h3>Total: {convertToCurrency(totalPrice)}</h3>
        </div>
        <div className="agree">
          <p>
            Infinity is exempt from transaction taxes that apply to purchases
            made in certain jurisdictions.
          </p>
        </div>
        <div className="complete-pay">
          <button
            onClick={
              !(
                localStorage.getItem("email") === "robertwijaya1033@gmail.com"
              ) && handleClick
            }
          >
            Complete Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
