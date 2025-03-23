import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 2,
    name: "John Doe",
    profilePic: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
  });

  // Initial joined book clubs
  const [joinedBookClubs, setJoinedBookClubs] = useState([
    {
      id: 1,
      name: "Thriller"
    },
    {
      id:2,
      name: "Science Fiction"
    }
  ]);
  
  // Function to join/leave a book club
  const toggleBookClub = (bookClub) => {
    setJoinedBookClubs(prev => {
      const isJoined = prev.some(bc => bc.id === bookClub.id);
      if (isJoined) {
        return prev.filter(bc => bc.id !== bookClub.id);
      } else {
        return [...prev, bookClub];
      }
    });
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      joinedBookClubs, 
      setJoinedBookClubs,
      toggleBookClub 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);