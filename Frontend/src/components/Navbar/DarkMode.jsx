import React, { useState, useEffect } from "react";
import darkPng from "../../assets/website/dark-mode-button.png";
import lightPng from "../../assets/website/light-mode-button.png";
import "./darkmode.css";

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const element = document.documentElement;
    element.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dark-mode-container">
      <img
        src={theme === "light" ? lightPng : darkPng}
        alt={`Enable ${theme === "light" ? "Dark" : "Light"} Mode`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="dark-mode-toggle"
      />
    </div>
  );
};

export default DarkMode;
