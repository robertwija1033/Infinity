import "./Payment.css";
import Cart from "../Cart/Cart";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import UserContext from "../../context/actions/userContext";
import Spinner from "../Spinner/Spinner";

const stripePromise = loadStripe(
  "pk_test_51LIBrVEJe7hR7YyeAY0AsNNpv1Ngmsh79EQAY8k2sTKul1hrWs4nX2gde3Cqqhrn5g4Jqi2BAFklKxu5SU1iZQ1L00QnsmowDI"
);

const Payment = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!(Object.keys(currentUser).length > 0)) return <Spinner />;

  return (
    <div className="container-payment">
      <div className="payment-details">
        <div className="details-logo">
          <i className="bi bi-geo-alt-fill"></i>
          <h4>Shipment Address</h4>
        </div>
        <div className="details-shipment" key={currentUser.id}>
          <div className="shipment-contact">
            <h4>{currentUser.fullName}</h4>
            <h4>{currentUser.mobilePhone}</h4>
          </div>
          <div className="shipment-address">
            <p>
              {currentUser.address}, {currentUser.province},{currentUser.city},
              {currentUser.districts},{currentUser.postalCode}
            </p>
          </div>
          <div
            className="shipement-change"
            onClick={() => navigate(`/checkout`)}
          >
            Edit
          </div>
        </div>
      </div>
      {<Cart Payment={"Pay"} StripePromise={stripePromise} />}
    </div>
  );
};

export default Payment;
