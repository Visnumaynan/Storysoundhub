// import Post from "../post/Post";
// import "./posts.scss";

// const Posts = ({ userId, bookClubId }) => {
//   //TEMPORARY
//   const posts = [
//     {
//       id: 1,
//       name: "Lucifer",
//       userId: 1,
//       bookClubId: 1, // Thriller
//       genre: "Fiction",
//       profilePic:
//         "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//       desc: "Just finished this amazing thriller book! Highly recommend it.",
//       img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 2,
//       name: "John Doe",
//       userId: 2,
//       bookClubId: 2, // Mystery
//       genre: "Mystery",
//       profilePic:
//         "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       desc: "Just sharing my thoughts on the latest book I read!",
//       img: "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 3,
//       name: "John Doe",
//       userId: 2,
//       bookClubId: null,
//       genre: "Fiction",
//       profilePic:
//         "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       desc: "Beautiful day for reading in the park!",
//       img: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 4,
//       name: "Lucifer",
//       userId: 1,
//       bookClubId: 1, // Thriller
//       genre: "Thriller",
//       profilePic:
//         "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//       desc: "Another day, another great book to discuss with the club...",
//       img: "https://images.pexels.com/photos/1647116/pexels-photo-1647116.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//   ];

//   // Filter posts by userId and/or bookClubId if provided
//   let filteredPosts = posts;
  
//   if (userId) {
//     filteredPosts = filteredPosts.filter(post => post.userId === parseInt(userId));
//   }
  
//   if (bookClubId) {
//     filteredPosts = filteredPosts.filter(post => post.bookClubId === parseInt(bookClubId));
//   }

//   return <div className="posts">
//     {filteredPosts.map(post=>(
//       <Post post={post} key={post.id}/>
//     ))}
//   </div>;
// };

// export default Posts;




import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";

const Posts = ({ userId, bookClubId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const base_url_api = process.env.BASE_URL_API || "http://localhost:8000";
        const response = await axios.get(`{base_url_api}/api/posts`);
        let fetchedPosts = response.data;

        // Filter out invalid posts (e.g., with post_id = 0)
        fetchedPosts = fetchedPosts.filter(post => post.post_id !== 0);

        // Transform API response to match Post component structure
        const formattedPosts = fetchedPosts.map(post => ({
          id: post.post_id,
          name: "Unknown User", // Replace with actual user name if available in the API
          userId: post.book_club_member.user_id,
          bookClubId: post.club.club_id,
          genre: "Unknown Genre", // No genre field in API response
          profilePic: "", // Add profile picture if available
          desc: post.content,
          img: post.media || "", // Assuming media can be an image URL
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map(post => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
