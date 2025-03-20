// src/services/dataService.js
import { v4 as uuidv4 } from 'uuid';

// Initial data - in a real app this would come from an API
const localStorageKey = 'storySoundData';

// Function to initialize or load data
export const initializeData = () => {
  const storedData = localStorage.getItem(localStorageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Default data if nothing is stored
  const initialData = {
    users: [
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
    ],
    bookClubs: [
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
    ],
    posts: [
      {
        id: 1,
        userId: 1,
        bookClubId: 1, // Thriller
        genre: "Fiction",
        desc: "Just finished this amazing thriller book! Highly recommend it.",
        img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
        likes: 12,
        comments: [
          {
            id: 1,
            userId: 2,
            desc: "I read that one too! The plot twist at the end was amazing.",
            createdAt: new Date(Date.now() - 30000).toISOString() // 30 seconds ago
          }
        ]
      },
      {
        id: 2,
        userId: 2,
        bookClubId: 2, // Mystery
        genre: "Mystery",
        desc: "Just sharing my thoughts on the latest book I read!",
        img: "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1600",
        createdAt: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
        likes: 8,
        comments: []
      },
      {
        id: 3,
        userId: 2,
        bookClubId: null,
        genre: "Fiction",
        desc: "Beautiful day for reading in the park!",
        img: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=1600",
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        likes: 15,
        comments: []
      },
      {
        id: 4,
        userId: 1,
        bookClubId: 1, // Thriller
        genre: "Thriller",
        desc: "Another day, another great book to discuss with the club...",
        img: "https://images.pexels.com/photos/1647116/pexels-photo-1647116.jpeg?auto=compress&cs=tinysrgb&w=1600",
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        likes: 20,
        comments: []
      }
    ],
    currentUser: {
      id: 2,
      joinedBookClubs: [1, 3] // IDs of joined book clubs
    }
  };
  
  // Save initial data to localStorage
  localStorage.setItem(localStorageKey, JSON.stringify(initialData));
  
  return initialData;
};

// Function to save data
export const saveData = (data) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};

// Post related functions
export const addPost = (newPostData) => {
  const data = initializeData();
  
  // Create a new post object
  const newPost = {
    id: uuidv4(),
    ...newPostData,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: []
  };
  
  // Add to posts array
  data.posts.unshift(newPost); // Add to beginning of array
  
  // Save updated data
  saveData(data);
  
  return newPost;
};

export const addComment = (postId, commentData) => {
  const data = initializeData();
  
  const postIndex = data.posts.findIndex(post => post.id === postId);
  
  if (postIndex !== -1) {
    const newComment = {
      id: uuidv4(),
      ...commentData,
      createdAt: new Date().toISOString()
    };
    
    data.posts[postIndex].comments.push(newComment);
    saveData(data);
    
    return newComment;
  }
  
  return null;
};

export const toggleLike = (postId, userId) => {
  const data = initializeData();
  
  const postIndex = data.posts.findIndex(post => post.id === postId);
  
  if (postIndex !== -1) {
    // In a full implementation, we would track which users liked which posts
    // For simplicity, we'll just toggle the count
    data.posts[postIndex].likes = data.posts[postIndex].likes ? data.posts[postIndex].likes - 1 : data.posts[postIndex].likes + 1;
    saveData(data);
    
    return data.posts[postIndex].likes;
  }
  
  return null;
};

export const getPosts = (filters = {}) => {
  const data = initializeData();
  let filteredPosts = [...data.posts];
  
  // Apply filters if provided
  if (filters.userId) {
    filteredPosts = filteredPosts.filter(post => post.userId === filters.userId);
  }
  
  if (filters.bookClubId) {
    filteredPosts = filteredPosts.filter(post => post.bookClubId === filters.bookClubId);
  }
  
  // Enhance posts with user data
  return filteredPosts.map(post => {
    const user = data.users.find(user => user.id === post.userId);
    
    return {
      ...post,
      name: user?.name || "Unknown User",
      profilePic: user?.profilePic || ""
    };
  });
};

export const getUser = (userId) => {
  const data = initializeData();
  return data.users.find(user => user.id === userId) || null;
};

export const getCurrentUser = () => {
  const data = initializeData();
  const userInfo = data.users.find(user => user.id === data.currentUser.id);
  
  return {
    ...userInfo,
    joinedBookClubs: data.currentUser.joinedBookClubs.map(clubId => 
      data.bookClubs.find(club => club.id === clubId)
    ).filter(Boolean)
  };
};

export const getBookClubs = () => {
  const data = initializeData();
  return data.bookClubs;
};

export const getBookClub = (bookClubId) => {
  const data = initializeData();
  return data.bookClubs.find(club => club.id === bookClubId) || null;
};

export const toggleBookClubMembership = (bookClubId) => {
  const data = initializeData();
  
  if (data.currentUser.joinedBookClubs.includes(bookClubId)) {
    // Leave the book club
    data.currentUser.joinedBookClubs = data.currentUser.joinedBookClubs.filter(id => id !== bookClubId);
  } else {
    // Join the book club
    data.currentUser.joinedBookClubs.push(bookClubId);
  }
  
  saveData(data);
  
  return data.currentUser.joinedBookClubs.map(clubId => 
    data.bookClubs.find(club => club.id === clubId)
  ).filter(Boolean);
};

export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};