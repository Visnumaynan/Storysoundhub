import Post from "../post/Post";
import "./posts.scss";

const Posts = ({ userId, bookClubId }) => {
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "Lucifer",
      userId: 1,
      bookClubId: 1, // Thriller
      genre: "Fiction",
      profilePic:
        "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      desc: "Just finished this amazing thriller book! Highly recommend it.",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "John Doe",
      userId: 2,
      bookClubId: 2, // Mystery
      genre: "Mystery",
      profilePic:
        "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Just sharing my thoughts on the latest book I read!",
      img: "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      name: "John Doe",
      userId: 2,
      bookClubId: null,
      genre: "Fiction",
      profilePic:
        "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Beautiful day for reading in the park!",
      img: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 4,
      name: "Lucifer",
      userId: 1,
      bookClubId: 1, // Thriller
      genre: "Thriller",
      profilePic:
        "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      desc: "Another day, another great book to discuss with the club...",
      img: "https://images.pexels.com/photos/1647116/pexels-photo-1647116.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  // Filter posts by userId and/or bookClubId if provided
  let filteredPosts = posts;
  
  if (userId) {
    filteredPosts = filteredPosts.filter(post => post.userId === parseInt(userId));
  }
  
  if (bookClubId) {
    filteredPosts = filteredPosts.filter(post => post.bookClubId === parseInt(bookClubId));
  }

  return <div className="posts">
    {filteredPosts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;