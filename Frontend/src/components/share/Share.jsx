import "./share.scss";
import Image from "../../assets/img.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Share = () => {
  const { user } = useUser();
  const [desc, setDesc] = useState("");
  const [selectedBookClub, setSelectedBookClub] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  // Get user details from Clerk
  const userName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.username || user.emailAddresses[0].emailAddress.split('@')[0];
    
  const profilePic = user.imageUrl || user.profileImageUrl;
  
  // Fetch genres from API using axios
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);
  
  // Listen for theme changes - improved implementation
  useEffect(() => {
    const updateTheme = () => {
      const storedTheme = localStorage.getItem("theme") || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setTheme(storedTheme);
    };
    
    window.addEventListener("storage", updateTheme);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    const intervalId = setInterval(updateTheme, 1000);
    
    return () => {
      window.removeEventListener("storage", updateTheme);
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Sharing post:", {
        userId: user.id,
        desc,
        bookClubId: selectedBookClub ? parseInt(selectedBookClub) : null,
        genre_id: selectedGenre,
        img: null
      });
      
      setDesc("");
      setSelectedBookClub("");
      setSelectedGenre("");
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };
  
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={profilePic} alt="" />
          <input 
            type="text" 
            placeholder={`What's on your mind ${userName}?`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr />
        <div className="selectors">
          <div className="selector">
            <label>Book Club:</label>
            <select 
              value={selectedBookClub} 
              onChange={(e) => setSelectedBookClub(e.target.value)}
            >
              <option value="">None</option>
              {/* We'll need to update this once we have the book clubs data from Clerk */}
              {[].map((club) => (
                <option key={club.id} value={club.id}>{club.name}</option>
              ))}
            </select>
          </div>
          <div className="selector">
            <label>Genre:</label>
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">None</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;