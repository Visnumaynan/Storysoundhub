import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/website/logo.png";
import DarkMode from "./DarkMode";
import { FaCartShopping } from "react-icons/fa6";
import UserIcon from "../../assets/website/user .png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container dark:bg-gray-900 dark:text-white duration-200 ">
      <div className="container navbar-content">
      <div className="brand">
        <Link to="/" className="brand-link">
           <img src={Logo} alt="Logo" className="logo-img" />
           Story Sound
        </Link>
      </div>

        <div className="nav-links">
          <div className="dark-mode-container">
            <DarkMode />
          </div>

          <ul className="menu">
            <li>
              <Link to="/" className="nav-item">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="nav-item">Shop</Link>
            </li>
            <li>
              <a href="/" className="nav-item">Community</a>
            </li>
            <li>
            <Link to="/CartPage" className="cart-icon">
            Order <FaCartShopping size={16} />
            </Link>
            </li>
            <li>
              <Link to="/loginRegister" className="user-profile">
                <img src={UserIcon} alt="User" className="user-icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
