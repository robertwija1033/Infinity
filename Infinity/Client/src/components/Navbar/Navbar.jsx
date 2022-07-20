import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarCategory from "./NavbarCategory";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ModalPassword from "../ModalPassword/ModalPassword";

const Navbar = ({
  setSelectedCategory,
  searchCategory,
  setSearchCategory,
  setNewSearchCategory,
}) => {
  const [openNavbarClick, setOpenNavbarClick] = useState(true);
  const [auth, setAuth] = useState("");
  const [user, setUser] = useState("");
  const [clickClose, setClickClose] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("email");
    let username = localStorage.getItem("fullName");

    setAuth(auth);
    setUser(username);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCategory({ ...searchCategory, [name]: value });
    console.log(searchCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost/UAS/Infinity/Server/admin/product.php",
        searchCategory
      )
      .then(function (response) {
        setNewSearchCategory(response.data);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <ModalPassword
        clickClose={clickClose}
        setClickClose={setClickClose}
        auth={auth}
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
              <p>Semua kategori</p>

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
                value={searchCategory.nameProduct}
                onChange={handleChange}
              />
            </div>
            <div className="search">
              <button
                type="button"
                className="button-search"
                onClick={handleSubmit}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div className="list-shop" onClick={() => navigate("/cart")}>
            <i className="bi bi-cart"></i>
          </div>
          {auth ? (
            <>
              <div className="register">
                <div className="user">
                  <h4>Welcome : {user}</h4>
                  <div className="setting">
                    {!(auth === "robertwijaya1033@gmail.com") && (
                      <>
                        <a onClick={() => navigate(`/register/${auth}`)}>
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
