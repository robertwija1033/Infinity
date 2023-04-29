import "./Cart.css";
import TableCart from "./TableCart";
import { useContext } from "react";
import axios from "axios";
import { convertToCurrency } from "../Home/convertToCurrency";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/actions/cart/cartContext";

const Cart = ({ Payment, StripePromise }) => {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useContext(CartContext);

  const handleClick = async () => {
    if (cartItems.length) {
      if (StripePromise) {
        const stripe = await StripePromise;
        console.log(cartItems);
        const response = await axios.post(
          "http://localhost:8080/paymentapi/createSession",
          cartItems
        );

        const API = response.data.messages.checkout_session;

        const respond = await axios.post("http://localhost:8080/paymentapi", {
          userId: localStorage.getItem("id"),
          paymentAPI: API,
        });

        stripe.redirectToCheckout({
          sessionId: API,
        });
      } else {
        navigate("/checkout");
      }
    }
  };

  return (
    <div className={Payment ? "cart-box props" : "cart-box"}>
      <div className="cart-title">
        <h3>Your Shopping Bag</h3>
        <input
          type="submit"
          value="Continue Shopping"
          onClick={() => navigate("/home")}
        />
      </div>
      <TableCart />
      <div className="cart-payment">
        <div className="payment">
          <div className="total">
            <p>total:</p>
            <h5>{convertToCurrency(totalPrice)}</h5>
          </div>
          <button
            onClick={
              !(
                localStorage.getItem("email") === "robertwijaya1033@gmail.com"
              ) && handleClick
            }
          >
            {Payment || "Secure Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
