import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  //TEMPORARY
  const liked = false;
  
  // Book club data - in a real app, this would come from context or API
  const bookClubs = [
    { id: 1, name: "Thriller" },
    { id: 2, name: "Mystery" },
    { id: 3, name: "Science Fiction" },
    { id: 4, name: "Fantasy" }
  ];
  
  // Find book club name if post has a book club
  const bookClub = post.bookClubId 
    ? bookClubs.find(bc => bc.id === post.bookClubId) 
    : null;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        {(bookClub || post.genre) && (
          <div className="postTags">
            {bookClub && (
              <Link to={`/book-club/${bookClub.id}`} className="bookClubTag">
                <BookIcon fontSize="small" />
                <span>{bookClub.name}</span>
              </Link>
            )}
            {post.genre && <span className="genreTag">{post.genre}</span>}
          </div>
        )}
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;