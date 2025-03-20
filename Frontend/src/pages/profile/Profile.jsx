import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Posts from "../../components/posts/Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Share from "../../components/share/Share";

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [user, setUser] = useState(null);

  // In a real app, you would fetch this data from an API
  const users = [
    {
      id: 1,
      name: "Lucifer",
      profilePic: "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      coverPic: "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "John Doe",
      profilePic: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
      coverPic: "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  useEffect(() => {
    setUser(users.find(u => u.id === parseInt(id)) || users[0]);
  }, [id]);

  if (!user) return <div>Loading...</div>;

  const isCurrentUser = currentUser.id === user.id;

  return (
    <div className="profile">
      <div className="images">
        <img
          src={user.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={user.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{user.name}</span>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            {!isCurrentUser && <button>follow</button>}
          </div>
        </div>
        {isCurrentUser && <Share />}
        <Posts userId={user.id} />
      </div>
    </div>
  );
};

export default Profile;