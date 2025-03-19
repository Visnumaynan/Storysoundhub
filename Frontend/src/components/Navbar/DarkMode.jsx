import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import darkPng from "../../assets/website/dark-mode-button.png";
import lightPng from "../../assets/website/light-mode-button.png";
import "./darkmode.css";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const element = document.documentElement;
    element.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dark-mode-container">
      <motion.img
        src={theme === "light" ? lightPng : darkPng}
        alt={`Enable ${theme === "light" ? "Dark" : "Light"} Mode`}
        onClick={toggleTheme}
        className="dark-mode-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default DarkMode;