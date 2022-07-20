import "./Detail.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { convertToCurrency } from "../Home/convertToCurrency";
// import "../Alert/Alert.css";
import Alert from "../Alert/Alert";
import axios from "axios";

const Detail = () => {
  const navigate = useNavigate();
  let ratingValue = 0;
  const [findProductById, setFindProductById] = useState({});
  const { id } = useParams();
  const [splitSpecification, setSplitSpecification] = useState([]);
  const [rating, setRating] = useState();
  const [isRatingHover, setIsRatingHover] = useState();
  const [isRatingClick, setIsRatingClick] = useState(false);
  const [AllUserRating, setAllUserRating] = useState();
  const [averageRating, setAverageRating] = useState();
  const [isAddToCartClick, setIsAddToCartClick] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getRating();
  }, []);

  const getProduct = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/admin/product.php", {
        url: "http://localhost:3000/detail",
        id,
      })
      .then(function (response) {
        if (response.data[0] === undefined) navigate("/NotFound");
        const [first, ...splitItem] = response.data[0].specification.split("•");
        setFindProductById(response.data[0]);
        setSplitSpecification(splitItem);
      });
  };

  const getRating = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/rating.php", {
        url: "http://localhost:3000/detail/getRate",
        productId: id,
      })
      .then(function (response) {
        let total = 0;
        response.data.map((rate) => {
          total += Number(rate.rating);
          const percentage = ((total / response.data.length) * 100) / 5 + "%";
          setAllUserRating(percentage);
          setAverageRating((total / response.data.length).toFixed(2));
        });
      });
  };

  const handleAddToCart = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/cart.php", {
        url: "http://localhost:3000/addToCart",
        userId: localStorage.getItem("id"),
        productId: id,
        quantity: 1,
      })
      .then(function (response) {
        setAllUserRating(response.data);
        setIsAddToCartClick(true);
      });
  };

  const handleAddToRate = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/rating.php", {
        url: "http://localhost:3000/detail/insertRate",
        userId: localStorage.getItem("id"),
        productId: id,
        rating,
      })
      .then(function (response) {
        console.log(response.data);
        setIsRatingClick(false);
        window.location.reload();
      });
  };

  return (
    <>
      <Navbar
        setSelectedCategory={""}
        searchCategory={""}
        setSearchCategory={""}
        newSearchCategory={""}
        setNewSearchCategory={""}
      />
      {localStorage.getItem("id") ? (
        <Alert
          Text={"You have successfully added to cart"}
          AlertStyle={{
            border: "1px solid #badbcc",
            backgroundColor: "#d1e7dd",
            color: "#0f5132",
          }}
          IconStyle={"#0f5132"}
          Icon={"bi bi-check-circle-fill"}
          Expression={isAddToCartClick}
          setExpression={setIsAddToCartClick}
        />
      ) : (
        <Alert
          Text={"You cannot add to cart because you don't have account!"}
          AlertStyle={{
            border: "1px solid #f5c2c7",
            backgroundColor: "#F8D7DA",
            color: "#842029",
          }}
          IconStyle={"#842029"}
          Icon={"bi bi-exclamation-circle-fill"}
          Expression={isAddToCartClick}
        />
      )}

      <div className="container-detail">
        <div className="container-information">
          <div className="information">
            <div className="information-image">
              <img src={`${findProductById.image}`} />
            </div>
            <div className="information-item">
              <div className="back">
                <Link to={"/home"}>Back/Information</Link>
                <div className="information-name">
                  {findProductById.nameProduct}
                </div>
                <div className="price">
                  <h1>{convertToCurrency(findProductById.price)}</h1>
                </div>
                <div className="information-remainder">
                  <div className="remainder">
                    <p>Remainder : {findProductById.amount}</p>
                  </div>
                  <div className="item">
                    <button
                      onClick={
                        !(
                          localStorage.getItem("email") ===
                          "robertwijaya1033@gmail.com"
                        ) && (() => setIsAddToCartClick(true), handleAddToCart)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="more-information">
                    <h2>Rate this product</h2>
                    <div className="rate">
                      {[...Array(5)].map((rate, i) => (
                        <label>
                          <input
                            name="rating"
                            type={"radio"}
                            value={(ratingValue = i + 1)}
                            onClick={() => setRating(i + 1)}
                          />
                          <i
                            className="bi bi-star-fill"
                            style={{
                              color:
                                ratingValue <= (isRatingHover || rating)
                                  ? "#0afdc6"
                                  : "white",
                              opacity:
                                ratingValue <= (isRatingHover || rating)
                                  ? "1"
                                  : ".2",
                            }}
                            onMouseEnter={
                              !(
                                localStorage.getItem("email") ===
                                "robertwijaya1033@gmail.com"
                              ) && (() => setIsRatingHover(i + 1))
                            }
                            onMouseLeave={
                              !(
                                localStorage.getItem("email") ===
                                "robertwijaya1033@gmail.com"
                              ) && (() => setIsRatingHover())
                            }
                            onClick={
                              !(
                                localStorage.getItem("email") ===
                                "robertwijaya1033@gmail.com"
                              ) && (() => setIsRatingClick(true))
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="rate-alert"
            style={{ display: isRatingClick ? "flex" : "none" }}
          >
            <i className="bi bi-check2"></i>
            <h2>You Rate : {rating} stars</h2>
            <button onClick={handleAddToRate}>Ok</button>
          </div>
        </div>
        <div className="container-specification">
          <div className="description">
            <h3>Deskripsi Produk</h3>
            <div className="specification">
              {splitSpecification.map((specification) => (
                <p>•{specification}</p>
              ))}
            </div>
            <h3>Penilaian Produk</h3>
            <div className="container-comment-list">
              <div className="product-rating">
                <div className="rating">
                  <h5>{averageRating} Stars</h5>
                  <div className="star-outer">
                    <div
                      className="star-inner"
                      style={{ width: AllUserRating }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
