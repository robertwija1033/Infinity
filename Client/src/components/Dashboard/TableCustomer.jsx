import axios from "axios";
import { useEffect, useState } from "react";

const TableCustomer = () => {

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getCheckoutDetail();
  }, []);

  const getCheckoutDetail = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/checkoutdetail.php", {
        url: "Dashboard/TableCustomer/getCheckoutDetail",
        userId: localStorage.getItem("id"),
      })
      .then(function (response) {
        setCustomer(response.data);
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>image</th>
          <th>Full Name</th>
          <th>name Product</th>
          <th>price</th>
          <th>quantity</th>
          <th>created_at</th>
        </tr>
      </thead>
      <tbody>
        {customer.map((user, key) => (
          <tr key={key}>
            <td data-label="ID">{user.id}</td>
            <td data-label="Image">
              <img src={`${user.image}`} alt={`${user.nameProduct}`} />
            </td>
            <td data-label="Full Name">
              {user.firstName} {user.lastName}
            </td>
            <td data-label="Name Product">{user.nameProduct}</td>
            <td data-label="Price">{user.price}</td>
            <td data-label="Quantity">{user.quantity}</td>
            <td data-label="Created_at">{user.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCustomer;
