import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Checkout.css";
import { convertToCurrency } from "../Home/convertToCurrency";
import { totalPrice } from "./totalPrice";
import Alert from "../Alert/Alert";
import Payment from "../Payment/Payment";
import NotFound from "../NotFound/NotFound";

const Checkout = () => {
  const navigate = useNavigate();
  let total = 0;
  const [getItemsCart, setGetItemsCart] = useState([{}]);
  const [checkout, setCheckout] = useState({
    userId: localStorage.getItem("id"),
    firstName: "",
    lastName: "",
    province: "",
    city: "",
    districts: "",
    postalCode: "",
    address: "",
    mobilePhone: "",
    url: "http://localhost:3000/insertCheckout",
  });
  // let isAlreadyCheckout = "";
  const [isAlreadyCheckout, setIsAlreadyCheckout] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .post("http://localhost/UAS/Infinity/Server/client/checkout.php", {
          url: "checkout/useEffect",
          userId: localStorage.getItem("id"),
        })
        .then(function (response) {
          const innerValue = response.data[0];
          setCheckout({
            userId: localStorage.getItem("id"),
            firstName: innerValue.firstName,
            lastName: innerValue.lastName,
            province: innerValue.province,
            city: innerValue.city,
            districts: innerValue.districts,
            postalCode: innerValue.postalCode,
            address: innerValue.address,
            mobilePhone: innerValue.mobilePhone,
            url: "checkout/handleClick/edit",
          });
        });
    }

    return () => {
      setCheckout({
        userId: localStorage.getItem("id"),
        firstName: "",
        lastName: "",
        province: "",
        city: "",
        districts: "",
        postalCode: "",
        address: "",
        mobilePhone: "",
        url: "http://localhost:3000/insertCheckout",
      });
    };
  }, [id]);

  useEffect(() => {
    getCheckout();
  }, []);

  useEffect(() => {
    getCart();
  }, []);

  if (!id && isAlreadyCheckout) {
    return <Payment />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCheckout((prevCheckout) => ({ ...prevCheckout, [name]: value }));
  };

  const handleClick = () => {
    if (id) {
      axios
        .post(
          "http://localhost/UAS/Infinity/Server/client/checkout.php",
          checkout
        )
        .then(function (response) {
          navigate("/payment");
        });
    } else {
      axios
        .post(
          "http://localhost/UAS/Infinity/Server/client/checkout.php",
          checkout
        )
        .then(function (response) {
          const checkoutId = response.data;
          navigate("/payment");
        });
    }
  };

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

  const getCheckout = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/checkout.php", {
        url: "http://localhost:3000/checkout/getCheckout",
        userId: localStorage.getItem("id"),
      })
      .then(function (response) {
        if (response.data.status === undefined && response.data.status !== 0)
          setIsAlreadyCheckout(response.data);
        else setIsAlreadyCheckout("");
      });
  };

  return (
    <>
      {getItemsCart.length ? null : (
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
              placeholder={"Nama Depan"}
              onChange={handleChange}
              name="firstName"
              value={checkout.firstName}
            />
            <input
              type={"text"}
              placeholder={"Nama Belakang"}
              onChange={handleChange}
              name="lastName"
              value={checkout.lastName}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Provinsi"}
              onChange={handleChange}
              name="province"
              value={checkout.province}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Kota"}
              onChange={handleChange}
              name="city"
              value={checkout.city}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"Kecamatan"}
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
              placeholder={"Alamat"}
              onChange={handleChange}
              name="address"
              value={checkout.address}
            />
          </div>
          <div className="input-box">
            <input
              type={"text"}
              placeholder={"No telp"}
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
          {getItemsCart.map((item) => (
            <div className="order-details">
              <img src={`${item.image}`} />
              <h5>{item.nameProduct}</h5>
              <p>{convertToCurrency(item.price * item.quantity)}</p>
              <p>{item.quantity} X</p>
            </div>
          ))}
        </div>
      </div>
      <div className="summary">
        <div className="name">
          <h1>Ringkasan</h1>
        </div>
        <div className="total">
          <h3>Total:</h3>
          {getItemsCart.map((item) => {
            total = totalPrice(item.price * item.quantity, total);
          })}

          {convertToCurrency(total)}
        </div>
        <div className="agree">
          <p>
            Infinity bebas dari pajak transaksi yang berlaku untuk pembelian
            yang dilakukan di yurisdiksi tertentu.
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
