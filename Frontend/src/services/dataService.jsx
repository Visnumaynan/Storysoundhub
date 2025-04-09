





// // src/services/dataService.js
// import { v4 as uuidv4 } from 'uuid';
// import { useUser, useClerk } from '@clerk/clerk-react';

// // Initial data - in a real app this would come from an API
// const localStorageKey = 'storySoundData';
// const DEFAULT_COVER_PIC = "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// // Function to get user data from Clerk
// export const getUserFromClerk = (clerkUser) => {
//   if (!clerkUser) return null;
  
//   return {
//     id: clerkUser.id,
//     name: clerkUser.firstName && clerkUser.lastName 
//       ? `${clerkUser.firstName} ${clerkUser.lastName}`
//       : clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split('@')[0],
//     profilePic: clerkUser.imageUrl || clerkUser.profileImageUrl,
//     coverPic: DEFAULT_COVER_PIC
//   };
// };

// // Function to initialize or load data
// export const initializeData = () => {
//   const storedData = localStorage.getItem(localStorageKey);
  
//   if (storedData) {
//     const parsedData = JSON.parse(storedData);
//     // Always ensure we're using the latest user data from Clerk
//     return parsedData;
//   }
  
//   // Default data if nothing is stored
//   const initialData = {
//     bookClubs: [
//       {
//         id: 1,
//         name: "Thriller",
//         coverPic: "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         description: "For fans of heart-pounding suspense and plot twists."
//       },
//       {
//         id: 2,
//         name: "Mystery",
//         coverPic: "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description: "Dive into whodunits and detective stories."
//       },
//       {
//         id: 3,
//         name: "Science Fiction",
//         coverPic: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description: "Explore futuristic worlds and technologies."
//       },
//       {
//         id: 4,
//         name: "Fantasy",
//         coverPic: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         description: "Magical realms and epic adventures."
//       }
//     ],
//     posts: [
//       {
//         id: 1,
//         userId: "clerk_user_id_will_be_replaced", // This will be replaced with actual Clerk ID on first login
//         bookClubId: 1, // Thriller
//         genre: "Fiction",
//         desc: "Just finished this amazing thriller book! Highly recommend it.",
//         img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//         createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
//         likes: 12,
//         comments: []
//       },
//       {
//         id: 2,
//         userId: "clerk_user_id_will_be_replaced", // This will be replaced with actual Clerk ID on first login
//         bookClubId: 2, // Mystery
//         genre: "Mystery",
//         desc: "Just sharing my thoughts on the latest book I read!",
//         img: "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1600",
//         createdAt: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
//         likes: 8,
//         comments: []
//       }
//     ],
//     joinedBookClubs: [1, 3] // IDs of joined book clubs
//   };
  
//   // Save initial data to localStorage
//   localStorage.setItem(localStorageKey, JSON.stringify(initialData));
  
//   return initialData;
// };

// // Function to ensure user data is in local storage
// export const ensureUserInLocalStorage = (clerkUser) => {
//   if (!clerkUser) return null;
  
//   const userData = getUserFromClerk(clerkUser);
//   return userData;
// };

// // Function to save data
// export const saveData = (data) => {
//   localStorage.setItem(localStorageKey, JSON.stringify(data));
// };

// // Post related functions
// export const addPost = (newPostData, clerkUser) => {
//   const data = initializeData();
//   const userData = getUserFromClerk(clerkUser);
  
//   // Create a new post object
//   const newPost = {
//     id: uuidv4(),
//     userId: userData.id,
//     ...newPostData,
//     createdAt: new Date().toISOString(),
//     likes: 0,
//     comments: []
//   };
  
//   // Add to posts array
//   data.posts.unshift(newPost); // Add to beginning of array
  
//   // Save updated data
//   saveData(data);
  
//   return {
//     ...newPost,
//     name: userData.name,
//     profilePic: userData.profilePic
//   };
// };

// export const addComment = (postId, commentData, clerkUser) => {
//   const data = initializeData();
//   const userData = getUserFromClerk(clerkUser);
  
//   const postIndex = data.posts.findIndex(post => post.id === postId);
  
//   if (postIndex !== -1) {
//     const newComment = {
//       id: uuidv4(),
//       userId: userData.id,
//       ...commentData,
//       createdAt: new Date().toISOString()
//     };
    
//     data.posts[postIndex].comments.push(newComment);
//     saveData(data);
    
//     return {
//       ...newComment,
//       name: userData.name,
//       profilePic: userData.profilePic
//     };
//   }
  
//   return null;
// };

// export const toggleLike = (postId, clerkUser) => {
//   const data = initializeData();
//   const userData = getUserFromClerk(clerkUser);
  
//   const postIndex = data.posts.findIndex(post => post.id === postId);
  
//   if (postIndex !== -1) {
//     // In a full implementation, we would track which users liked which posts
//     // For simplicity, we'll just toggle the count
//     data.posts[postIndex].likes = data.posts[postIndex].likes ? data.posts[postIndex].likes - 1 : data.posts[postIndex].likes + 1;
//     saveData(data);
    
//     return data.posts[postIndex].likes;
//   }
  
//   return null;
// };

// export const getPosts = async (filters = {}, clerkUsers = null) => {
//   const data = initializeData();
//   let filteredPosts = [...data.posts];
  
//   // Apply filters if provided
//   if (filters.userId) {
//     filteredPosts = filteredPosts.filter(post => post.userId === filters.userId);
//   }
  
//   if (filters.bookClubId) {
//     filteredPosts = filteredPosts.filter(post => post.bookClubId === filters.bookClubId);
//   }
  
//   // Enhance posts with user data from Clerk
//   return Promise.all(filteredPosts.map(async post => {
//     let userData;
    
//     if (clerkUsers && clerkUsers[post.userId]) {
//       // Use cached user data if available
//       userData = clerkUsers[post.userId];
//     } else if (window.Clerk) {
//       try {
//         // Fetch user data from Clerk
//         const user = await window.Clerk.users.getUser(post.userId);
//         userData = getUserFromClerk(user);
        
//         // Cache the user data
//         if (!clerkUsers) clerkUsers = {};
//         clerkUsers[post.userId] = userData;
//       } catch (error) {
//         console.error('Error fetching user from Clerk:', error);
//         userData = {
//           name: "Unknown User",
//           profilePic: ""
//         };
//       }
//     } else {
//       userData = {
//         name: "Unknown User",
//         profilePic: ""
//       };
//     }
    
//     return {
//       ...post,
//       name: userData.name,
//       profilePic: userData.profilePic
//     };
//   }));
// };

// export const getBookClubs = () => {
//   const data = initializeData();
//   return data.bookClubs;
// };

// export const getBookClub = (bookClubId) => {
//   const data = initializeData();
//   return data.bookClubs.find(club => club.id === bookClubId) || null;
// };

// export const getJoinedBookClubs = (clerkUser) => {
//   const data = initializeData();
//   return data.joinedBookClubs.map(clubId => 
//     data.bookClubs.find(club => club.id === clubId)
//   ).filter(Boolean);
// };

// export const toggleBookClubMembership = (bookClubId, clerkUser) => {
//   const data = initializeData();
  
//   if (data.joinedBookClubs.includes(bookClubId)) {
//     // Leave the book club
//     data.joinedBookClubs = data.joinedBookClubs.filter(id => id !== bookClubId);
//   } else {
//     // Join the book club
//     data.joinedBookClubs.push(bookClubId);
//   }
  
//   saveData(data);
  
//   return data.joinedBookClubs.map(clubId => 
//     data.bookClubs.find(club => club.id === clubId)
//   ).filter(Boolean);
// };

// export const formatTimeAgo = (dateString) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffInSeconds = Math.floor((now - date) / 1000);
  
//   if (diffInSeconds < 60) {
//     return "just now";
//   } else if (diffInSeconds < 3600) {
//     const minutes = Math.floor(diffInSeconds / 60);
//     return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//   } else if (diffInSeconds < 86400) {
//     const hours = Math.floor(diffInSeconds / 3600);
//     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   } else {
//     const days = Math.floor(diffInSeconds / 86400);
//     return `${days} day${days > 1 ? 's' : ''} ago`;
//   }
// };