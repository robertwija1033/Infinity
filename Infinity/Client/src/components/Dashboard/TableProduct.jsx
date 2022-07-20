import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertToCurrency } from "../Home/convertToCurrency";

const TableProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/admin/product.php", {
        url: "http://localhost:3000/home",
      })
      .then(function (response) {
        setProducts(response.data);
        // navigate("/dashboard");
      });
  };

  const handleDelete = (e) => {
    axios
      .post(`http://localhost/UAS/Infinity/Server/admin/product.php`, {
        url: "http://localhost:3000/delete",
        idProduct: e.target.name,
      })
      .then(function (response) {
        window.location.reload();
      });
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
        {products.map((user, key) => (
          <tr key={key}>
            <td data-label="ID">{user.id}</td>
            <td data-label="Product Name">{user.nameProduct}</td>
            <td data-label="Price">{convertToCurrency(user.price)}</td>
            <td data-label="amount">{user.amount}</td>
            <td data-label="type">{user.type}</td>
            <td data-label="Date">{user.created_at}</td>
            <td>
              <button
                type="button"
                onClick={() => navigate(`/product/${user.id}`)}
              >
                Edit
              </button>
            </td>
            <td>
              <button type="button" name={user.id} onClick={handleDelete}>
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
