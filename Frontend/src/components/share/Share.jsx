import "./share.scss";
import Image from "../../assets/img.png";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const Share = () => {
  const { currentUser, joinedBookClubs } = useUser();
  const [desc, setDesc] = useState("");
  const [selectedBookClub, setSelectedBookClub] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  
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
    // Function to update theme from localStorage
    const updateTheme = () => {
      const storedTheme = localStorage.getItem("theme") || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setTheme(storedTheme);
    };
    
    // Listen for storage events (when theme changes from another tab)
    window.addEventListener("storage", updateTheme);
    
    // Create a MutationObserver to watch for dark class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });
    
    // Start observing the document element for class changes
    observer.observe(document.documentElement, { attributes: true });
    
    // Check theme periodically as a fallback
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
      // In a real app, you would send this to an API using axios
      console.log("Sharing post:", {
        userId: currentUser.id,
        desc,
        bookClubId: selectedBookClub ? parseInt(selectedBookClub) : null,
        genre_id: selectedGenre, // Updated to match API naming convention
        img: null // Would be handled with file upload in a real app
      });
      
      // Example of how you might implement the actual API call:
      // await axios.post("http://localhost:8000/api/books", {
      //   title: desc,
      //   author: currentUser.name,
      //   type: "post",
      //   picture: "", // Would be from file upload
      //   genre_id: selectedGenre,
      //   price: 0,
      //   owner_id: currentUser.id,
      //   condition: "N/A",
      //   quantity: 1,
      //   book_club_id: selectedBookClub || null
      // });
      
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
          <img src={currentUser.profilePic} alt="" />
          <input 
            type="text" 
            placeholder={`What's on your mind ${currentUser.name}?`}
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
              {joinedBookClubs.map((club) => (
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