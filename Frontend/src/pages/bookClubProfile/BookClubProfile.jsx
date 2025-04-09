import "./bookClubProfile.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Posts from "../../components/posts/Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Share from "../../components/share/Share";
import BookClubService from "../../services/BookClubService";

const BookClubProfile = () => {
  const { id } = useParams();
  const { currentUser, joinedBookClubs, toggleBookClub } = useUser();
  const [bookClub, setBookClub] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookClub = async () => {
      try {
        setLoading(true);
        const data = await BookClubService.getBookClubById(id);
        
        // Add default cover pic if not provided by API
        const bookClubWithImage = {
          ...data,
          coverPic: data.picture || "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        };
        
        setBookClub(bookClubWithImage);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch book club:", err);
        setError("Failed to load book club details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookClub();
  }, [id]);

  // Check if user has joined this book club
  useEffect(() => {
    if (bookClub) {
      setIsJoined(joinedBookClubs.some(bc => bc.id === parseInt(id) || bc.id === id));
    }
  }, [id, joinedBookClubs, bookClub]);

  const handleJoin = () => {
    if (bookClub) {
      toggleBookClub(bookClub);
    }
  };

  if (loading) return <div className="loadingIndicator">Loading book club details...</div>;
  if (error) return <div className="errorMessage">{error}</div>;
  if (!bookClub) return <div className="notFoundMessage">Book club not found</div>;

  return (
    <div className="bookClubProfile">
      <div className="images">
        <img
          src={bookClub.coverPic}
          alt=""
          className="cover"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            {/* Empty div to maintain layout */}
          </div>
          <div className="center">
            <span>{bookClub.name || bookClub.club_name}</span>
            <p className="description">{bookClub.description}</p>
          </div>
          <div className="right">
            <button onClick={handleJoin}>{isJoined ? 'Leave' : 'Join'}</button>
          </div>
        </div>
        {isJoined && <Share />}
        <Posts bookClubId={bookClub.id} />
      </div>
    </div>
  );
};

export default BookClubProfile;