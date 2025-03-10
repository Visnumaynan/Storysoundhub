import "./share.scss";
import Image from "../../assets/img.png";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

const Share = () => {
  const { currentUser, joinedBookClubs } = useUser();
  const [desc, setDesc] = useState("");
  const [selectedBookClub, setSelectedBookClub] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  
  // Sample genres
  const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Romance", "Thriller", "Fantasy", "Biography"];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    console.log("Sharing post:", {
      userId: currentUser.id,
      desc,
      bookClubId: selectedBookClub ? parseInt(selectedBookClub) : null,
      genre: selectedGenre,
      img: null // Would be handled with file upload in a real app
    });
    setDesc("");
    setSelectedBookClub("");
    setSelectedGenre("");
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
                <option key={genre} value={genre}>{genre}</option>
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