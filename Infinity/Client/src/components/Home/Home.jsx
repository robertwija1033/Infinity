import { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import CardBox from "./CardBox";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState({
    nameProduct: "",
    url: "yes",
  });
  const [newSearchCategory, setNewSearchCategory] = useState("");
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const newData = products.filter((item) => selectedCategory === item.type);
      setProduct(newData);
    }

    return () => setProduct([]);
    // cleanup function
  }, [selectedCategory]);

  useEffect(() => {
    if (newSearchCategory) {
      setSelectedCategory("");
    }
  }, [newSearchCategory]);

  const getProduct = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/admin/product.php", {
        url: "http://localhost:3000/home",
      })
      .then(function (response) {
        setProduct(response.data);
        setProducts(response.data);
      });
  };

  return (
    <>
      <Navbar
        setSelectedCategory={setSelectedCategory}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        setNewSearchCategory={setNewSearchCategory}
      />

      <div className="card-box">
        {!selectedCategory && newSearchCategory.length > 0 ? (
          <>
            {newSearchCategory.map((user, key) => (
              <CardBox
                key={user.id}
                name={user.nameProduct}
                price={user.price}
                remainder={user.amount}
                image={user.image}
              />
            ))}
          </>
        ) : (
          <>
            {product.map((user, key) => (
              <CardBox
                key={user.id}
                id={user.id}
                name={user.nameProduct}
                price={user.price}
                remainder={user.amount}
                image={user.image}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
