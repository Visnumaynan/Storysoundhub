import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaPinterest } from "react-icons/fa";
import footerLogo from "../../assets/website/logo.png";
import "./Footer.css"; // Import external CSS

const FooterLinks = [
  { title: "Home", link: "/#" },
  { title: "Shop", link: "/#Shop" },
  { title: "Community", link: "/#Community" },
  { title: "About", link: "/#About" },
  { title: "Contact", link: "/#Contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="footer-container">
      <section className="footer-section">
        <div className="footer-main">
          {/* Company Logo & Title - First Column */}
          <div className="footer-brand-column">
            <div className="footer-logo">
              <img src={footerLogo} alt="Story Sound Logo" />
            </div>
            <h1 className="footer-title">Story Sound</h1>
            <div className="footer-quote-container">
              <p className="footer-quote">
                "Where Every Book Takes You on a Journey Through a Universe of
                Extraordinary Wonders and Limitless Imagination"
              </p>
            </div>
          </div>

          {/* Quick Links - Second Column */}
          <div className="footer-links-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links-list">
              {FooterLinks.map((link, index) => (
                <li key={index} className="footer-link-item">
                  <a href={link.link}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect - Third Column */}
          <div className="footer-contact">
            <h3 className="footer-heading">Connect With Us</h3>
            <a href="mailto:Sdgpcs146@gmail.com" className="email-link">Sdgpcs146@gmail.com</a>
            <div className="social-icons-container">
              <a href="https://www.instagram.com/storysoundhub/?igsh=cWh1a2t4eWJiejFz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/company/storysoundhub/" aria-label="LinkedIn">
                <FaLinkedin className="social-icon" />
              </a>
              <a href="https://www.pinterest.com/StorySoundHub/" aria-label="Pinterest">
                <FaPinterest className="social-icon" />
              </a>

            </div>
          </div>
        </div>

        {/* Copyright & Bottom Links */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Story Sound Hub. All rights reserved
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;