import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import { convertToCurrency } from "../Home/convertToCurrency";
import "./Bag.css";
import UserContext from "../../context/actions/userContext";

const Bag = () => {
  const [bag, setBag] = useState([]);
  const [isGetBag, setIsGetBag] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getBag();
  }, []);

  const getBag = async () => {
    if (localStorage.getItem("id")) {
      const response = await axios.get(
        `http://localhost:8080/invoices/${currentUser.id}`
      );

      setBag(response.data);
    } else {
      setIsGetBag(true);
    }
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
      <div className="container-dashboard">
        <div className="dashboard">
          <h3>Customer Order</h3>

          <div className="dashboard-order">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>image</th>
                  <th>Full Name</th>
                  <th>name Product</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>buy_at</th>
                </tr>
              </thead>
              <tbody>
                {bag.map((user, key) => (
                  <tr key={key}>
                    <td data-label="ID">{key + 1}</td>
                    <td data-label="Image">
                      <img
                        src={`${user.image}`}
                        alt={`${user.nameProduct}`}
                        width={"50px"}
                      />
                    </td>
                    <td data-label="Full Name">
                      {user.firstName} {user.lastName}
                    </td>
                    <td data-label="Name Product">{user.nameProduct}</td>
                    <td data-label="Price">{convertToCurrency(user.price)}</td>
                    <td data-label="Quantity">{user.quantity}</td>
                    <td data-label="Created_at">{user.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isGetBag && (
              <Alert
                Text={"You don't have any account!"}
                AlertStyle={{
                  border: "1px solid #f5c2c7",
                  backgroundColor: "#F8D7DA",
                  color: "#842029",
                  position: "absolute",
                  top: "150px",
                }}
                IconStyle={"#842029"}
                Icon={"bi bi-exclamation-circle-fill"}
                Expression={isGetBag}
                setExpression={setIsGetBag}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bag;
