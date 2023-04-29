import "./Detail.css";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { convertToCurrency } from "../Home/convertToCurrency";
import Alert from "../Alert/Alert";
import axios from "axios";
import UserContext from "../../context/actions/userContext";
import CartContext from "../../context/actions/cart/cartContext";

const Detail = () => {
  const { currentUser } = useContext(UserContext);
  const { addItemToCart } = useContext(CartContext);
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

  const getProduct = async () => {
    const response = await axios
      .get(`http://localhost:8080/products/${id}`)
      .catch((err) => {
        navigate("/NotFound");
      });

    const [first, ...splitItem] = response.data.specification.split("•");
    let data = response.data;
    const productId = data.id;
    data = { ...data, productId };
    delete data.id;

    setFindProductById(data);
    setSplitSpecification(splitItem);
  };

  const getRating = async () => {
    if (localStorage.getItem("id")) {
      const response = await axios
        .get(`http://localhost:8080/rates/${id}`)
        .catch((err) => {
          console.log(err);
        });

      let total = 0;
      response.data.map((rate) => {
        total += Number(rate.rate);
        const percentage = ((total / response.data.length) * 100) / 5 + "%";
        setAllUserRating(percentage);
        setAverageRating((total / response.data.length).toFixed(2));
      });
    } else {
      setIsAddToCartClick(true);
    }
  };

  const handleAddToCart = async () => {
    addItemToCart(findProductById);
    setIsAddToCartClick(true);
  };

  const handleAddToRate = () => {
    axios
      .post("http://localhost:8080/rates", {
        userId: currentUser.id,
        productId: id,
        rate: rating,
      })
      .catch((err) => {
        console.log(err);
      });

    setIsRatingClick(false);
  };

  return (
    <>
      <Navbar />
      {currentUser.id ? (
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
                        !(currentUser.email === "robertwijaya1033@gmail.com") &&
                        (() => setIsAddToCartClick(true), handleAddToCart)
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
                                currentUser.email ===
                                "robertwijaya1033@gmail.com"
                              ) && (() => setIsRatingHover(i + 1))
                            }
                            onMouseLeave={
                              !(
                                currentUser.email ===
                                "robertwijaya1033@gmail.com"
                              ) && (() => setIsRatingHover())
                            }
                            onClick={
                              !(
                                currentUser.email ===
                                "robertwijaya1033@gmail.com"
                              ) &&
                              id &&
                              (() => setIsRatingClick(true))
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
            <h3>Product Description</h3>
            <div className="specification">
              {splitSpecification.map((specification) => (
                <p>•{specification}</p>
              ))}
            </div>
            <h3>Product Assessment</h3>
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
