import "./Cart.css";
import TableCart from "./TableCart";
import { totalPrice } from "../Checkout/totalPrice";
import { useEffect, useState } from "react";
import axios from "axios";
import { convertToCurrency } from "../Home/convertToCurrency";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  let total = 0;
  // const [total, setTotal] = useState(0);
  const [getItemsCart, setGetItemsCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    localStorage.getItem("id") &&
      axios
        .post("http://localhost/UAS/Infinity/Server/client/cart.php", {
          url: "http://localhost:3000/GetCart",
          userId: localStorage.getItem("id"),
        })
        .then(function (response) {
          setGetItemsCart(response.data);
        });
  };

  const handleClick = async () => {
    if (getItemsCart.length) {
      if (props.stripePromise) {
        const stripe = await props.stripePromise;
        const response = await axios
          .post(
            "http://localhost/UAS/Infinity/Server/client/payment.php",
            getItemsCart
          )
          .then(function (response) {
            console.log(response.data.id);
            axios
              .post("http://localhost/UAS/Infinity/Server/admin/admin.php", {
                url: "cart/handleClick/paymentAPI",
                paymentAPI: response.data.id,
              })
              .then(function (res) {
                const result = stripe.redirectToCheckout({
                  sessionId: response.data.id,
                });
              });
          });
        const session = await response.json();
      } else {
        navigate("/checkout");
      }
    }
  };

  return (
    <div className="cart-box">
      <div className="cart-title">
        <h3>Your Shopping Bag</h3>
        <input
          type="submit"
          value="Continue Shopping"
          onClick={() => navigate("/home")}
        />
      </div>
      <TableCart GetItemsCart={getItemsCart} />
      <div className="cart-payment">
        <div className="payment">
          <div className="total">
            <p>total:</p>
            <h5>
              {getItemsCart.map((item) => {
                total = totalPrice(item.price * item.quantity, total);
              })}

              {convertToCurrency(total)}
            </h5>
          </div>
          <button
            onClick={
              !(
                localStorage.getItem("email") === "robertwijaya1033@gmail.com"
              ) && handleClick
            }
          >
            {props.payment || "Secure Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
