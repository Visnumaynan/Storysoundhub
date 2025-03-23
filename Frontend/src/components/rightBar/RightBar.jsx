import "./rightBar.scss";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

const RightBar = () => {
  const { joinedBookClubs, toggleBookClub } = useUser();

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Your Book Clubs</span>
          {joinedBookClubs.length === 0 ? (
            <div className="noClubs">
              You haven't joined any book clubs yet.
            </div>
          ) : (
            joinedBookClubs.map(club => (
              <div className="user" key={club.id}>
                <div className="userInfo">
                  <Link to={`/book-club/${club.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <span>{club.name}</span>
                  </Link>
                </div>
                <div className="buttons">
                  <button onClick={() => toggleBookClub(club)}>leave</button>
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