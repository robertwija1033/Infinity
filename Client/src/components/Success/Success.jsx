import "./Success.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import CheckoutContext from "../../context/actions/checkoutContext";
import UserContext from "../../context/actions/userContext";
import CartContext from "../../context/actions/cart/cartContext";
import Spinner from "../Spinner/Spinner";

const Success = () => {
  const { id } = useParams();
  const [getAPI, setGetAPI] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    // Call the async function
    getCheckout();
  }, []);

  if (getAPI) return <NotFound />;

  const getCheckout = async () => {
    const userId = localStorage.getItem("id");

    const respond = await axios
      .get(`http://localhost:8080/paymentapi/${userId}`)
      .catch((err) => {
        console.log(err);
      });

    setGetAPI(respond.data.paymentAPI !== id);

    let items = await axios.post("http://localhost:8080/carts/getCartItems", {
      userId,
    });

    console.log(items.data);

    if (respond.data.paymentAPI === id && items.data.length) {
      items.data.map((item) => {
        subtractCartItem(item);

        invoice(item);
      });
    }
  };

  const subtractCartItem = async (item) => {
    const userId = localStorage.getItem("id");

    await axios
      .post("http://localhost:8080/carts/subtractCartItem", {
        id: item.id,
        userId,
        productId: item.productId,
        quantity: item.quantity,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const invoice = async (item) => {
    const userId = localStorage.getItem("id");

    await axios
      .post("http://localhost:8080/invoices", {
        userId,
        productId: item.productId,
        quantity: item.quantity,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-success">
      <div className="success-title">
        <h2>Success Payment</h2>
        <p>Your purchases have been confirmed!</p>
        <Link to={"/home"}>Go back to Home</Link>
      </div>
      <div className="success-logo">
        <i className="bi bi-check-lg"></i>
      </div>
    </div>
  );
};

export default Success;
