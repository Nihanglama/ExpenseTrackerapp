import { useState, useEffect } from "react";
import "../assets/Styles/home.css";
import Developerteamcards from "../Components/DeveloperTeamCards";
import section1img from "../assets/Images/photo.png";
import headerlogo from "../assets/Images/logo.png";
import EMAProfile from "../assets/Images/EmaImage.png";
import BenefitImage from "../assets/Images/BenefitsImage.png";

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="globalFonts">
      <div className="header">
        <div className="header-logo">
          <img src={headerlogo} alt="" />
        </div>
        <div className={`header-navbar ${menuOpen ? "show" : ""}`}>
          <a href="/">Home</a>
          <a href="/#teams">About us</a>
          <a href="/login" id="loginButton">
            Login/Register
          </a>
        </div>
        <i className="fa-solid fa-bars hamburger-icon" onClick={toggleMenu}></i>
      </div>
      {/* Other components and sections */}
      <div className="home-section1">
        <div className="home-section1-left">
          <img src={section1img} alt="" />
        </div>
        <div className="home-section-2-right">
          <h1 style={{ color: "#5A9DD4" }}>Streamline</h1>
          <h1 style={{ color: "#5A9DD4" }}>Your Finances with Our</h1>
          <h2>Cash Management App</h2>
          <a href="/#description" id="getStartedBtn">
            Get Started
          </a>
        </div>
      </div>

      {/* Container Wrapper */}
      <div className="container-wrapper">
        <div id="description">
          <div className="description-content">
            <div className="description-left">
              <img src={EMAProfile} alt="" />
            </div>
            <div className="description-right">
              <h1>Manage Your Money</h1>
              <p>
                <i className="fa-solid fa-arrow-right"></i> Track Deposit and
                Withdrawal
              </p>
              <p>
                <i className="fa-solid fa-arrow-right"></i> Download PDF
              </p>
              <p>
                <i className="fa-solid fa-arrow-right"></i> Custom Entry Search
              </p>
            </div>
          </div>
        </div>
        <div className="benefits">
          <div className="benefit-image">
            <img src={BenefitImage} alt="" />
          </div>
          <div className="benefit-text">
            <h1>Other Benefits</h1>
            <ul>
              <li>100% Safe and Secure</li>
              <li>Easy User Interface</li>
              <li>Customer Support</li>
            </ul>
          </div>
        </div>
      </div>
      <div id="teams">
        <h1>Our Teams</h1>
        <Developerteamcards />
      </div>
      <div className="footer">
        <p>© 2023 Expenses Management App. All rights reserved</p>
      </div>
    </div>
  );
}
