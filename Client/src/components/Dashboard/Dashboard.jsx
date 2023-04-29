import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import TableUser from "./TableUser";
import TableProduct from "./TableProduct";
import TableCustomer from "./TableCustomer";
import Login from "../Login/Login";
import { useContext } from "react";
import UserContext from "../../context/actions/userContext";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (currentUser.email !== "robertwijaya1033@gmail.com") return <Login />;

  return (
    <>
      <div className="container-dashboard">
        <Sidebar />
        <div className="dashboard">
          <h3>Dashboard</h3>
          <h3>Order</h3>
          <div className="dashboard-order">
            <TableCustomer />
            <h3>User</h3>
            <TableUser />
            <h3>Product</h3>
            <TableProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
