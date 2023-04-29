import { Link } from "react-router-dom";
import { convertToCurrency } from "./convertToCurrency";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51LIBrVEJe7hR7YyeAY0AsNNpv1Ngmsh79EQAY8k2sTKul1hrWs4nX2gde3Cqqhrn5g4Jqi2BAFklKxu5SU1iZQ1L00QnsmowDI"
);

const CardBox = ({ Product }) => {
  const handleClick = async (product) => {
    product = { ...product, quantity: 1 };
    const item = [];
    item.push(product);

    if (stripePromise) {
      const stripe = await stripePromise;
      console.log(stripe);

      console.log(item);

      const response = await axios.post(
        "http://localhost:8080/paymentapi/createSession",
        item
      );

      const API = response.data.messages.checkout_session;

      const respond = await axios.post("http://localhost:8080/paymentapi", {
        userId: localStorage.getItem("id"),
        paymentAPI: API,
      });

      stripe.redirectToCheckout({
        sessionId: API,
      });
    }
  };

  return (
    <div className="card" key={Product.id}>
      <div className="image-box">
        <img src={`${Product.image}`} />
      </div>
      <div className="content-card">
        <h2>{Product.nameProduct}</h2>
        <div className="content">
          <h3>Price :</h3>
          <span>{convertToCurrency(Product.price)}</span>
        </div>
        <div className="content">
          <h3>Remaining :</h3>
          <span>{Product.amount}</span>
        </div>
        <div className="information">
          <Link to={`/detail/${Product.id}`}>More</Link>
        </div>
        <button onClick={() => handleClick(Product)} className="buy">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CardBox;
