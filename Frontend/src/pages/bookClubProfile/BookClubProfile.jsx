import "./bookClubProfile.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Posts from "../../components/posts/Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Share from "../../components/share/Share";

const BookClubProfile = () => {
  const { id } = useParams();
  const { currentUser, joinedBookClubs } = useUser();
  const [bookClub, setBookClub] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  // In a real app, you would fetch this data from an API
  const bookClubs = [
    {
      id: 1,
      name: "Thriller",
      coverPic: "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Mystery",
      coverPic: "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  useEffect(() => {
    setBookClub(bookClubs.find(bc => bc.id === parseInt(id)) || bookClubs[0]);
    // Check if user has joined this book club
    setIsJoined(joinedBookClubs.some(bc => bc.id === parseInt(id)));
  }, [id, joinedBookClubs]);

  if (!bookClub) return <div>Loading...</div>;

  const handleJoin = () => {
    // In a real app, you would send this to an API
    console.log(`${isJoined ? 'Leaving' : 'Joining'} book club:`, bookClub.name);
    // The actual join/leave logic would be handled in the UserContext
  };

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
            <span>{bookClub.name}</span>
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