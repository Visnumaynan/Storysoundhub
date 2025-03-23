import "./rightBar.scss";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const RightBar = () => {
  const { joinedBookClubs, toggleBookClub, loading } = useUser();
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

  const handleLeaveClub = (club) => {
    toggleBookClub(club);
  };

  return (
    <div className={`rightBar ${theme === "dark" ? "dark" : ""}`}>
      <div className="container">
        <div className="item">
          <span>Your Book Clubs</span>
          {loading ? (
            <div className="loading">Loading your book clubs...</div>
          ) : joinedBookClubs.length === 0 ? (
            <div className="noClubs">
              You haven't joined any book clubs yet.
              <Link to="/book-clubs" className="browseLink">Browse Clubs</Link>
            </div>
          ) : (
            joinedBookClubs.map(club => (
              <div className="user" key={club.id}>
                <div className="userInfo">
                  <Link to={`/book-club/${club.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <span>{club.name || club.club_name}</span>
                  </Link>
                </div>
                <div className="buttons">
                  <button onClick={() => handleLeaveClub(club)}>leave</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;