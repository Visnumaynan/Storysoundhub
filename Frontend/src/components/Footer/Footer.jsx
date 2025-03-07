import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import footerLogo from "../../assets/website/logo.png";
import "./Footer.css"; // Import external CSS

const FooterLinks = [
  { title: "Home", link: "/#" },
  { title: "Shop", link: "/#Shop" },
  { title: "Community", link: "/#Community" },
  { title: "About", link: "/#About" },
];

const Footer = () => {
  return (
    <div className="footer-container">
      <section className="footer-section">
        <div className="footer-grid">
          {/* Company Details */}
          <div className="footer-company">
            <h1 className="footer-logo">
              <img src={footerLogo} alt="Logo" />
            </h1>
            <h1 className="footer-title">Story Sound</h1>
          </div>

          <div className="footer-description">
            <p className="footer-quote">
              "Where Every Book Takes You on a Journey Through a Universe of
              Extraordinary Wonders and Limitless Imagination"
            </p>
            <p className="footer-email"></p>
          </div>

          {/* Important Links */}
          <div className="footer-links">
            <h1 className="footer-links-title">Important Links</h1>
            <ul>
              {FooterLinks.map((link, index) => (
                <li key={index} className="footer-link-item">
                  <a href={link.link}>
                    <span className="arrow">&#11162;</span>
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <ul>
              <li>
              <a href="https://www.instagram.com/storysoundhub/?igsh=cWh1a2t4eWJiejFz" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              </li>
              <li>
                <a href="#">
                  <FaLinkedin className="social-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          © 2024 All rights reserved
        </div>
      </section>
    </div>
  );
};

export default Footer;
