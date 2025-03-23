import "./bookClubs.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

const BookClubs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubDescription, setNewClubDescription] = useState("");
  
  // In a real app, you would fetch this data from an API
  const [bookClubs, setBookClubs] = useState([
    {
      id: 1,
      name: "Thriller",
      coverPic: "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "For fans of heart-pounding suspense and plot twists."
    },
    {
      id: 2,
      name: "Mystery",
      coverPic: "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Dive into whodunits and detective stories."
    },
    {
      id: 3,
      name: "Science Fiction",
      coverPic: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Explore futuristic worlds and technologies."
    },
    {
      id: 4,
      name: "Fantasy",
      coverPic: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Magical realms and epic adventures."
    }
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewClubName("");
    setNewClubDescription("");
  };

  const handleAddBookClub = (e) => {
    e.preventDefault();
    
    if (newClubName.trim() === "") return;
    
    const newClub = {
      id: bookClubs.length + 1, // Simple ID generation (use UUID in production)
      name: newClubName,
      // Default cover image for new clubs
      coverPic: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    };
    
    setBookClubs([...bookClubs, newClub]);
    closeModal();
  };

  return (
    <div className="bookClubs">
      <div className="bookClubsHeader">
        <h1>Available Book Clubs</h1>
        <button 
          className="addBookClubButton" 
          onClick={openModal}
          aria-label="Add new book club"
        >
          <i className="fas fa-plus"></i> Add Book Club
        </button>
      </div>
      
      <div className="bookClubsList">
        {bookClubs.map(club => (
          <Link 
            to={`/book-club/${club.id}`} 
            key={club.id}
            className="bookClubCard"
          >
            <div className="bookClubImageContainer">
              <img src={club.coverPic} alt={club.name} />
              <div className="gradient"></div>
            </div>
            <div className="bookClubInfo">
              <h2>{club.name}</h2>
              <p>{club.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Modal for adding a new book club */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Create New Book Club</h2>
            <form onSubmit={handleAddBookClub}>
              <div className="formGroup">
                <label htmlFor="clubName">Club Name</label>
                <input
                  type="text"
                  id="clubName"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  placeholder="Enter book club name"
                  required
                />
              </div>
              <div className="modalButtons">
                <button type="button" className="cancelButton" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="createButton">
                  Create Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookClubs;