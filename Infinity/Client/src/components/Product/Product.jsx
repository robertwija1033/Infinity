import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import "./Product.css";
import { uploadImages } from "./imageHelper";
import { useParams } from "react-router-dom";
import Alert from "../Alert/Alert";
import Login from "../Login/Login";

const Product = () => {
  const [item, setItem] = useState({
    nameProduct: "",
    price: "",
    specification: "",
    type: "",
    amount: "",
    url: "http://localhost:3000/product",
  });
  const [isProductClick, setIsProductClick] = useState(true);
  const [image, setImage] = useState();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .post("http://localhost/UAS/Infinity/Server/admin/product.php", {
          url: "http://localhost:3000/detail",
          id,
        })
        .then(function (response) {
          const innerValue = response.data[0];
          setItem({
            nameProduct: innerValue.nameProduct,
            price: innerValue.price,
            specification: innerValue.specification,
            type: innerValue.type,
            amount: innerValue.amount,
            url: "http://localhost:3000/product/handleSubmit/edit",
          });

          setImage(innerValue.image);
        });
    }

    return () => {
      setItem({
        nameProduct: "",
        price: "",
        specification: "",
        type: "",
        amount: "",
        url: "http://localhost:3000/product",
      });

      setImage();
    };
  }, [id]);

  if (localStorage.getItem("email") !== "robertwijaya1033@gmail.com")
    return <Login />;

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleClick = (e) => {
    const name = e.target.name;
    setItem((prevItem) => ({ ...prevItem, ["type"]: name }));
    console.log(item);
  };

  const handleSubmit = async (e) => {
    const imageUrl = await uploadImages([image]);
    if (id) {
      axios
        .post("http://localhost/UAS/Infinity/Server/admin/product.php", {
          ...item,
          image: imageUrl[0],
          id,
        })
        .then(function (response) {});
    } else {
      const data = await axios.post(
        "http://localhost/UAS/Infinity/Server/admin/product.php",
        { ...item, image: imageUrl[0] }
      );
    }
    setIsProductClick(false);
  };

  return (
    <div className="product-container">
      {isProductClick || (
        <Alert
          Text={"You succesfully input product"}
          AlertStyle={{
            border: "1px solid #badbcc",
            backgroundColor: "#d1e7dd",
            color: "#0f5132",
          }}
          IconStyle={"#0f5132"}
          Icon={"bi bi-check-circle-fill"}
          Expression={true}
        />
      )}
      <Sidebar />
      <div className="product">
        <div className="make-product">
          <div className="upload-product-photo">
            {image ? (
              <img
                src={
                  image
                    ? typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                    : undefined
                }
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                <i className="bi bi-image"></i>
                <span>Add Photo</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleChangeImage} />
          </div>
          <div className="fill-product">
            <div className="fill-price">
              <div className="currency">
                <h4>Price</h4>
                <i className="bi bi-cash"></i>
              </div>
              <input
                type={"text"}
                placeholder="fill the price"
                onChange={handleChange}
                name="price"
                value={item.price}
              />
            </div>
            <div className="fill-name">
              <div className="name">
                <h4>Name</h4>
                <i className="bi bi-card-text"></i>
              </div>
              <input
                type={"text"}
                placeholder={"fill the name"}
                onChange={handleChange}
                name="nameProduct"
                value={item.nameProduct}
              />
            </div>
            <div className="fill-specification">
              <div className="specify">
                <h4>Specification : </h4>
                <textarea
                  onChange={handleChange}
                  name="specification"
                  value={item.specification}
                />
              </div>
            </div>
            <div className="submit-product">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          <div className="fill-right">
            <div className="fill-amount">
              <div className="amount">
                <h4>Amount</h4>
                <i className="bi bi-tag"></i>
              </div>
              <input
                type={"number"}
                placeholder={"fill the amount"}
                onChange={handleChange}
                name="amount"
                value={item.amount}
              />
            </div>
            <div className="fill-category">
              <h4>Category Type</h4>
              <div className="category">
                {/* <input type={"submit"} /> */}
                <button onClick={handleClick} name="Television">
                  Television
                  <i className="bi bi-tv"></i>
                </button>
                <button onClick={handleClick} name="Smartphone">
                  Smartphone
                  <i className="bi bi-phone"></i>
                </button>
                <button onClick={handleClick} name="Speaker">
                  Speaker
                  <i className="bi bi-speaker"></i>
                </button>
                <button onClick={handleClick} name="Refrigerator">
                  Refrigerator
                  <i className="bi bi-square-half"></i>
                </button>
                <button onClick={handleClick} name="Printer">
                  Printer
                  <i className="bi bi-printer"></i>
                </button>
                <button onClick={handleClick} name="WashingM">
                  Washing Machine
                  <i className="bi bi-box2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
