import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertToCurrency } from "../Home/convertToCurrency";
import ProductContext from "../../context/actions/productContext";

const TableProduct = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);

  const handleDelete = async (e) => {
    await axios.delete(`http://localhost:8080/products/${e.target.name}`);

    const product = products.filter((product) => product.id !== e.target.name);

    setProducts(product);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>amount</th>
          <th>type</th>
          <th>Date</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, key) => (
          <tr key={key}>
            <td data-label="ID">{product.id}</td>
            <td data-label="Product Name">{product.nameProduct}</td>
            <td data-label="Price">{convertToCurrency(product.price)}</td>
            <td data-label="amount">{product.amount}</td>
            <td data-label="type">{product.type}</td>
            <td data-label="Date">{product.created_at}</td>
            <td>
              <button
                type="button"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Edit
              </button>
            </td>
            <td>
              <button type="button" name={product.id} onClick={handleDelete}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableProduct;
