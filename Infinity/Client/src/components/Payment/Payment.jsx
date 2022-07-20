import "./Payment.css";
import Cart from "../Cart/Cart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { convertToCurrency } from "../Home/convertToCurrency";

const stripePromise = loadStripe(
  "pk_test_51LIBrVEJe7hR7YyeAY0AsNNpv1Ngmsh79EQAY8k2sTKul1hrWs4nX2gde3Cqqhrn5g4Jqi2BAFklKxu5SU1iZQ1L00QnsmowDI"
);

const Payment = () => {
  const [getDetailCheckout, setGetDetailCheckout] = useState([]);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCheckoutDetail();
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const getCheckoutDetail = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/checkout.php", {
        url: "http://localhost:3000/payment/getCheckoutDetail",
        userId: localStorage.getItem("id"),
      })
      .then(function (response) {
        if (response.data.length === 0) {
          navigate("/checkout");
        }

        console.log(response.data.length);
        setGetDetailCheckout(response.data);
      });
  };

  const getProduct = () => {
    id &&
      axios
        .post("http://localhost/UAS/Infinity/Server/admin/product.php", {
          url: "Payment/getProduct",
          id,
        })
        .then(function (response) {
          setProduct(response.data[0]);
        });
  };

  const handleClick = async () => {
    const stripe = await stripePromise;
    const response = await axios
      .post("http://localhost/UAS/Infinity/Server/client/payment.php", [
        { ...product, quantity },
      ])
      .then(function (response) {
        console.log(response.data.id);
        axios
          .post("http://localhost/UAS/Infinity/Server/admin/admin.php", {
            url: "cart/handleClick/paymentAPI",
            paymentAPI: response.data.id,
          })
          .then(function (res) {
            window.localStorage.setItem("productId", product.id);
            window.localStorage.setItem("quantity", quantity);

            const result = stripe.redirectToCheckout({
              sessionId: response.data.id,
            });
          });
      });
    const session = await response.json();
  };

  return (
    <div className="container-payment">
      <div className="payment-details">
        <div className="details-logo">
          <i className="bi bi-geo-alt-fill"></i>
          <h4>Shipment Address</h4>
        </div>
        {getDetailCheckout.map((details) => (
          <div className="details-shipment" key={details.id}>
            <div className="shipment-contact">
              <h4>
                {details.firstName} {details.lastName}
              </h4>
              <h4>{details.mobilePhone}</h4>
            </div>
            <div className="shipment-address">
              <p>
                {details.address}, {details.province},{details.city},
                {details.districts},{details.postalCode}
              </p>
            </div>
            <div
              className="shipement-change"
              onClick={() => navigate(`/checkout/${details.id}`)}
            >
              Edit
            </div>
          </div>
        ))}
      </div>
      {id && (
        <>
          <div className="product-buynow">
            <div className="product-detail">
              <div className="product-image">
                <img src={`${product.image}`} />
                <h3>{product.nameProduct}</h3>
              </div>
              <div className="product-price">
                <h4>{convertToCurrency(product.price * quantity)}</h4>
              </div>
              <div className="product-quantity">
                <button
                  onClick={quantity > 1 && (() => setQuantity(quantity - 1))}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button onClick={() => setQuantity(quantity + 1)} name="plus">
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="payment">
            <button
              onClick={
                !(
                  localStorage.getItem("email") === "robertwijaya1033@gmail.com"
                ) && handleClick
              }
            >
              Pay
            </button>
          </div>
        </>
      )}

      {!id && <Cart payment={"Pay"} stripePromise={stripePromise} />}
    </div>
  );
};

export default Payment;
