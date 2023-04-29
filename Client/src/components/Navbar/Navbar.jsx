import React, { useContext, useState } from "react";
import NavbarCategory from "./NavbarCategory";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ModalPassword from "../ModalPassword/ModalPassword";
import UserContext from "../../context/actions/userContext";

const Navbar = ({ setSelectedCategory, search, setSearch }) => {
  const [openNavbarClick, setOpenNavbarClick] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [clickClose, setClickClose] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setCurrentUser({});
    localStorage.clear();
  };

  return (
    <>
      <ModalPassword
        clickClose={clickClose}
        setClickClose={setClickClose}
        auth={currentUser.email}
      />
      <div className="navbar">
        <Link className="navbar-brand" to={"/"}>
          <img src={`${process.env.PUBLIC_URL}/infinity.png`} />
          Infinity
        </Link>
        <div className={openNavbarClick ? "navbar-item" : "navbar-item active"}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={"/home"}>
                Home
              </Link>
            </li>
          </ul>
          <div className="navbar-search">
            <div className="search-category">
              <p>All Category</p>

              <i className="bi bi-chevron-down"></i>
              <ul>
                <NavbarCategory
                  setSelectedCategory={setSelectedCategory}
                  category={"Television"}
                />
                <NavbarCategory
                  setSelectedCategory={setSelectedCategory}
                  category={"Smartphone"}
                />
                <NavbarCategory
                  setSelectedCategory={setSelectedCategory}
                  category={"Refrigerator"}
                />
                <NavbarCategory
                  setSelectedCategory={setSelectedCategory}
                  category={"Speaker"}
                />
                <NavbarCategory
                  setSelectedCategory={setSelectedCategory}
                  category={"Printer"}
                />
                <NavbarCategory
                  setSelectedCategory={setSelectedCategory}
                  category={"WashingM"}
                />
              </ul>
            </div>
            <div className="searching">
              <input
                type="text"
                placeholder="Search"
                name="nameProduct"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="list-shop" onClick={() => navigate("/cart")}>
            <i className="bi bi-cart"></i>
          </div>
          {currentUser.email ? (
            <>
              <div className="register">
                <div className="user">
                  <h4>Welcome : {currentUser.fullName}</h4>
                  <div className="setting">
                    {!(currentUser.email === "robertwijaya1033@gmail.com") && (
                      <>
                        <a
                          onClick={() =>
                            navigate(`/register/${currentUser.id}`)
                          }
                        >
                          Edit Profile
                        </a>
                        <a onClick={() => setClickClose(true)}>
                          Delete Account
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            </>
          ) : (
            <div className="register">
              <button type="button" onClick={() => navigate("/register")}>
                Register
              </button>
              <button type="button" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
        <div
          className="hamburger"
          onClick={() => setOpenNavbarClick(!openNavbarClick)}
        >
          <i className="bi bi-list"></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
