import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHeart } from "react-icons/fa";
import Logo from "../../assets/website/logo.png";
import DarkMode from "./DarkMode";
import UserIcon from "../../assets/website/user .png";
import "./Navbar.css";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar-container dark:bg-gray-900 dark:text-white duration-200">
      <div className="container navbar-content">

      <div className="brand">
  <Link to="/" className="brand-link">
  <div className="logo-wrapper">
  <img src={Logo} alt="Logo" className="logo-img" />
  </div>
    Story Sound Hub
  </Link>
</div>


        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <div className="dark-mode-container">
            <DarkMode />
          </div>

          <ul className="menu">
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/shop" className="nav-item">Shop</Link></li>
            <li><a href="/book-club-home" className="nav-item">Community</a></li>
            <li>
              <Link to="/CartPage" className="cart-icon">
                <FaHeart className="inline-block text-white" /> My List
              </Link>
            </li>
          </ul>
        </div>
        {/* <Link to="/loginRegister" className="user-profile">
        
                <img src={UserIcon} alt="User" className="user-icon" />
        </Link> */}

        <div className="user-profile">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10", // Match your user-icon size
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link to="/loginRegister">
              <img src={UserIcon} alt="User" className="user-icon" />
            </Link>
          </SignedOut>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
