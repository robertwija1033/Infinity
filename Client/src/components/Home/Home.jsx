import { useState, useEffect, useContext, useMemo } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import CardBox from "./CardBox";
import ProductContext from "../../context/actions/productContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const { products } = useContext(ProductContext);

  const searching = useMemo(() => {
    if (!search && !selectedCategory) return products;

    if (search) {
      setSelectedCategory("");
      return products.filter((product) => {
        return product.nameProduct.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (selectedCategory) {
      setSearch("");
      return products.filter((product) => {
        return product.type
          .toLowerCase()
          .includes(selectedCategory.toLowerCase());
      });
    }
  }, [search, selectedCategory, products]);

  return (
    <>
      <Navbar
        setSelectedCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
      />

      <div className="card-box">
        {searching.map((product) => (
          <CardBox Product={product} key={product.id} />
        ))}
      </div>
      <div className="bag" onClick={() => navigate("/bag")}>
        <h2>Bag</h2>
        <div className="icon-bag">
          <i className="bi bi-bag-fill"></i>
        </div>
      </div>
    </>
  );
};

export default Home;
