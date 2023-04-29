import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const [openNavbarClick, setOpenNavbarClick] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <div className="container-landing-navbar">
        <div className="navbar">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} />
          <div className="hamburger">
            <i
              className="bi bi-list"
              onClick={() => setOpenNavbarClick(!openNavbarClick)}
            ></i>
          </div>
        </div>
        <div
          className={
            openNavbarClick ? "responsive-landing" : "responsive-landing active"
          }
        >
          <ul>
            <li>
              <a href="#service">Our Service</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li href="#autentikasi">Authentication</li>
          </ul>
        </div>
      </div>
      <div className="container-landing space">
        <div className="container-title">
          <h1>Infinity</h1>
          <img src={`${process.env.PUBLIC_URL}/infinity.png`} />
        </div>
        <div className="link">
          <div className="link-list">
            <ul>
              <li>
                <a href="#service">Our Service</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#autentikasi">Authentication</a>
              </li>
            </ul>
          </div>
          <div className="btn-landing">
            <button type="submit" onClick={() => navigate("/home")}>
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="container-service" id="service">
        <h2>Our Service</h2>
        <div className="all-image-list">
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/details.png`} />
            <h5>Specificaton</h5>
            <p>Has detailed specifications for each product</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/respond.png`} />
            <h5>Respond</h5>
            <p>Respond quickly to customers</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/Delivery.png`} />
            <h5>Shipping</h5>
            <p>Have a fast and free Shipper to satisfy customers</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/Security.png`} />
            <h5>Security</h5>
            <p>Have shopping security</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/estetik.png`} />
            <h5>Aesthetic</h5>
            <p>Has a beautiful aesthetic design to spoil the eyes</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/Original.png`} />
            <h5>Original</h5>
            <p>Items supplied are 100% Ori</p>
          </div>
        </div>
      </div>
      <div className="container-about-us" id="about">
        <h2>About Us</h2>
        <div className="about-us">
          <div className="about-image">
            <img src={`${process.env.PUBLIC_URL}/about-us.png`} />
          </div>
          <div className="text">
            <h3>Why choose our products?</h3>
            <p>
              Our mission is to satisfy customers because customers are king
            </p>
            <ul>
              <li>
                product design we issued a separate design. we are very well
                responded by the market, this special design also makes many
                users are more comfortable using this website than other
                websites, in the design section of this website always
                prioritize the highest quality product characteristics and
                cannot be separated from the technology that we sell. from the
                technology that we sell.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="slider" id="autentikasi">
        <div className="slide">
          <div className="slider1">
            <h2>Register</h2>
            <button onClick={() => navigate("/register")}>Click Here</button>
          </div>
        </div>
        <div className="slide">
          <div className="slider2">
            <h2>Login</h2>
            <button onClick={() => navigate("/login")}>Click Here</button>
          </div>
        </div>
      </div>
      <div className="footer space">
        <div className="social-icon">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-twitter"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-envelope"></i>
        </div>
        <p>© Copyright 2022 All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Landing;
