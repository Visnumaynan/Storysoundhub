import "./leftBar.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Update import
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";

const LeftBar = () => {
  const { user } = useUser(); // Use Clerk's user
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  // Theme effect remains the same...

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Get user details from Clerk
  const userName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.username || user?.emailAddresses[0].emailAddress.split('@')[0];
    
  const profilePic = user?.imageUrl || user?.profileImageUrl;
  const userId = user?.id;

  return (
    <div className={`leftBar ${collapsed ? "collapsed" : ""} ${theme === "dark" ? "dark" : ""}`}>
      <div className="container">
        <div className="collapseToggle" onClick={toggleCollapse}>
          {collapsed ? <MenuOpenIcon /> : <MenuIcon />}
        </div>
        <div className="menu">
          <Link
            to={`/profile/${userId}`}
            className="user"
          >
            <img src={profilePic} alt="" />
            <span>{userName}</span>
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