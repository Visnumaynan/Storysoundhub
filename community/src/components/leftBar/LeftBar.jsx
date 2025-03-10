import "./leftBar.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";

const LeftBar = () => {
  const { currentUser } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`leftBar ${collapsed ? "collapsed" : ""}`}>
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
            to="/" 
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