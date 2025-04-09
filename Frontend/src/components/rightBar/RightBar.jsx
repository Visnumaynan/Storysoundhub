import "./rightBar.scss";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BookClubService from "../../services/BookClubService";

const RightBar = () => {
  const [bookClubs, setBookClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  // Fetch all book clubs
  useEffect(() => {
    const fetchBookClubs = async () => {
      try {
        setLoading(true);
        const data = await BookClubService.getAllBookClubs();
        setBookClubs(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch book clubs:", err);
        setError("Failed to load book clubs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookClubs();
  }, []);

  // Theme sync effect
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme);
      }
    };
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    const handleStorageChange = (e) => {
      if (e.key === "theme") {
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    
    const interval = setInterval(updateTheme, 100);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [theme]);

  const handleClubClick = (clubId) => {
    navigate(`/book-clubs`);
  };

  return (
    <div className={`rightBar ${theme === "dark" ? "dark" : ""}`}>
      <div className="container">
        <div className="item">
          <span>Book Clubs</span>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : bookClubs.length === 0 ? (
            <div className="noClubs">
              No book clubs available
            </div>
          ) : (
            <div className="clubsList">
              {bookClubs.map(club => (
                <div 
                  key={club.id}
                  className="clubName"
                  onClick={() => handleClubClick(club.id)}
                >
                  {club.name || club.club_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;