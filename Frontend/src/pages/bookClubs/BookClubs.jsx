import "./bookClubs.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import BookClubService from "../../services/BookClubService";

const BookClubs = () => {
  const { currentUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubDescription, setNewClubDescription] = useState("");
  const [bookClubs, setBookClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book clubs from API
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewClubName("");
    setNewClubDescription("");
  };

  const handleAddBookClub = async (e) => {
    e.preventDefault();
    
    if (newClubName.trim() === "") return;
    
    try {
      const newClubData = {
        club_name: newClubName,
        description: newClubDescription,
        creator_user_id: currentUser.id.toString()
      };
      
      const newClub = await BookClubService.createBookClub(newClubData);
      
      // Add a default cover pic since API doesn't handle images
      const newClubWithImage = {
        ...newClub,
        coverPic: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      };
      
      setBookClubs([...bookClubs, newClubWithImage]);
      closeModal();
    } catch (err) {
      console.error("Failed to create book club:", err);
      alert("Failed to create book club. Please try again.");
    }
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
      
      {loading ? (
        <div className="loadingIndicator">Loading book clubs...</div>
      ) : error ? (
        <div className="errorMessage">{error}</div>
      ) : (
        <div className="bookClubsList">
          {bookClubs.length === 0 ? (
            <div className="noClubsMessage">No book clubs available. Be the first to create one!</div>
          ) : (
            bookClubs.map(club => (
              <Link 
                to={`/book-club/${club.id}`} 
                key={club.id}
                className="bookClubCard"
              >
                <div className="bookClubImageContainer">
                  {/* Use club.picture from API if available, otherwise use a default */}
                  <img 
                    src={club.picture || club.coverPic || "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg"} 
                    alt={club.name || club.club_name} 
                  />
                  <div className="gradient"></div>
                </div>
                <div className="bookClubInfo">
                  <h2>{club.name || club.club_name}</h2>
                  <p>{club.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

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
              <div className="formGroup">
                <label htmlFor="clubDescription">Description</label>
                <textarea
                  id="clubDescription"
                  value={newClubDescription}
                  onChange={(e) => setNewClubDescription(e.target.value)}
                  placeholder="Enter a brief description of this book club"
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