import "./Success.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

const Success = () => {
  const { id } = useParams();
  const [getAPI, setGetAPI] = useState(false);

  useEffect(() => {
    getCheckout();
  }, []);

  if (getAPI) return <NotFound />;

  const getCheckout = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/admin/admin.php", {
        url: "success/useEffect",
      })
      .then(function (response) {
        setGetAPI(response.data[0].paymentAPI !== id);
        if (response.data[0].paymentAPI === id) {
          axios
            .post("http://localhost/UAS/Infinity/Server/client/checkout.php", {
              url: "success/getCheckout",
              userId: localStorage.getItem("id"),
            })
            .then(function (response) {
              const checkoutId = response.data;
              console.log(checkoutId);
              axios
                .post("http://localhost/UAS/Infinity/Server/client/cart.php", {
                  url: "http://localhost:3000/GetCart",
                  userId: localStorage.getItem("id"),
                })
                .then(function (response) {
                  if (response.data.length) {
                    response.data.map((data) => {
                      axios.post(
                        "http://localhost/UAS/Infinity/Server/client/checkoutDetail.php",
                        {
                          url: "success/getCheckout",
                          userId: localStorage.getItem("id"),
                          checkoutId,
                          productId: data.productId,
                          quantity: data.quantity,
                        }
                      );
                    });
                  } else {
                    axios
                      .post(
                        "http://localhost/UAS/Infinity/Server/client/checkoutDetail.php",
                        {
                          url: "success/getCheckout",
                          checkoutId,
                          productId: localStorage.getItem("productId"),
                          quantity: localStorage.getItem("quantity"),
                        }
                      )
                      .then(() => {
                        localStorage.removeItem("productId");
                        localStorage.removeItem("quantity");
                      });
                  }
                });
            });
        }
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
        <i class="bi bi-check-lg"></i>
      </div>
    </div>
  );
};

export default Success;
