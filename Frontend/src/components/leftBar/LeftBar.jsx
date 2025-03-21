import "./leftBar.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";

const LeftBar = () => {
  const { currentUser } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  // Improved theme sync
  useEffect(() => {
    // Function to update theme state
    const updateTheme = () => {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme);
      }
    };
    
    // Initial check
    updateTheme();
    
    // Use MutationObserver to detect HTML class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" && 
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      });
    });
    
    // Start observing document element for class changes
    observer.observe(document.documentElement, { attributes: true });
    
    // Also listen for storage events
    const handleStorageChange = (e) => {
      if (e.key === "theme") {
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    
    // Fallback polling at a faster interval
    const interval = setInterval(updateTheme, 100);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [theme]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`leftBar ${collapsed ? "collapsed" : ""} ${theme === "dark" ? "dark" : ""}`}>
      <div className="container">
        <div className="collapseToggle" onClick={toggleCollapse}>
          {collapsed ? <MenuOpenIcon /> : <MenuIcon />}
        </div>
        <div className="menu">
          <Link
            to={`/profile/${currentUser.id}`}
            className="user"
          >
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </Link>
          
          <Link
            to="/book-club-home"
            className="item"
          >
            <HomeIcon className="icon" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/book-clubs" 
            className="item"
          >
            <GroupsIcon className="icon" />
            <span>Book Clubs</span>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default LeftBar;