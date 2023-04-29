import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [clickSidebarHamburger, setClickSidebarHamburger] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.clear();
    window.location.reload();
    navigate("/login");
  };

  return (
    <div
      className={
        clickSidebarHamburger ? "container-sidebar" : "container-sidebar open"
      }
    >
      <div className="sidebar">
        <i
          className="bi bi-list"
          onClick={() => setClickSidebarHamburger(!clickSidebarHamburger)}
        ></i>
        <div className="sidebar-brand">
          <img src={`${process.env.PUBLIC_URL}/infinity.png`} />
          <h3>Infinity</h3>
        </div>
        <div className="sidebar-link">
          <ul>
            <li>
              <Link to={"/dashboard"} className="menu">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/product"} className="menu">
                <i className="bi bi-bag"></i>
                <span>Product</span>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <a onClick={handleLogOut} className="menu">
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
