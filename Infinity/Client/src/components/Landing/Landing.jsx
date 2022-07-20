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
              <a href="#service"></a>
            </li>
            <li>
              <a href="#about">Tentang Kami</a>
            </li>
            <li href="#autentikasi">Autentikasi</li>
          </ul>
        </div>
      </div>
      <div className="container-landing space">
        <div className="container-title">
          <h1>Infinity</h1>
          {/* <img src={`${process.env.PUBLIC_URL}/technology.png`} /> */}
          <img src={`${process.env.PUBLIC_URL}/infinity.png`} />
        </div>
        <div className="link">
          <div className="link-list">
            <ul>
              <li>
                <a href="#service">Servis Kami</a>
              </li>
              <li>
                <a href="#about">Tentang Kami</a>
              </li>
              <li>
                <a href="#autentikasi">Autentikasi</a>
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
        <h2>Servis Kami</h2>
        <div className="all-image-list">
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/details.png`} />
            <h5>Spesifikasi</h5>
            <p>Memiliki Spesifikasi yang detail di setiap produk</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/respond.png`} />
            <h5>Respond</h5>
            <p>Memberi respon yang cepat kepada pelanggan</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/Delivery.png`} />
            <h5>Pengiriman</h5>
            <p>
              Memiliki Pengirim yang cepat dan gratis untuk memuaskan pelanggan
            </p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/Security.png`} />
            <h5>Keamanan</h5>
            <p>Memiliki keamanan berbelanja</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/estetik.png`} />
            <h5>Estetik</h5>
            <p>Memiliki design estetika yang cantik untuk memanjakan mata</p>
          </div>
          <div className="image-list">
            <img src={`${process.env.PUBLIC_URL}/Original.png`} />
            <h5>Original</h5>
            <p>Barang yang disediakan 100% Ori</p>
          </div>
        </div>
      </div>
      <div className="container-about-us" id="about">
        <h2>Tentang kami</h2>
        <div className="about-us">
          <div className="about-image">
            <img src={`${process.env.PUBLIC_URL}/about-us.png`} />
          </div>
          <div className="text">
            <h3>Kenapa harus memilih produk kami?</h3>
            <p>
              Misi kami adalah untuk memuaskan pelanggan karena pelanggan adalah
              raja
            </p>
            <ul>
              <li>
                desain produk (kami) mengeluarkan desain tersendiri.kami sangat
                di respon baik oleh pasar,desain yang khusus ini juga membuat
                banyak pengguna lebih nyaman menggunakan website ini dibanding
                website yang lain, pada bagian desain website ini selalu
                mengutamakan ciri produk yang kualitas tertinggi dan tidak lepas
                dari teknologi yang yang kita jual.
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
