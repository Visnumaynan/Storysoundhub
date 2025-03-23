import "./bookClubs.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const BookClubs = () => {
  // In a real app, you would fetch this data from an API
  const bookClubs = [
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
  ];

  return (
    <div className="bookClubs">
      <h1>Available Book Clubs</h1>
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
    </div>
  );
};

export default BookClubs;