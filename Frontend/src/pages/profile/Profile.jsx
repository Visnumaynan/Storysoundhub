// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./profile.scss";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import Posts from "../../components/posts/Posts";
// import { useUser } from "../../context/UserContext";
// import Share from "../../components/share/Share";

// const Profile = () => {
//   const { id } = useParams();
//   const { currentUser } = useUser();
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || 
//     (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
//   );

//   // In a real app, you would fetch this data from an API
//   const users = [
//     {
//       id: 1,
//       name: "Lucifer",
//       profilePic: "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//       coverPic: "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//     },
//     {
//       id: 2,
//       name: "John Do",
//       profilePic: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       coverPic: "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     }
//   ];

//   useEffect(() => {
//     setUser(users.find(u => u.id === parseInt(id)) || users[0]);
//   }, [id]);
  
//   // Listen for theme changes - improved implementation
//   useEffect(() => {
//     // Function to handle theme changes
//     const handleThemeChange = () => {
//       const currentTheme = localStorage.getItem("theme") || "light";
//       setTheme(currentTheme);
//     };
    
//     // Set up event listener for storage changes
//     window.addEventListener("storage", handleThemeChange);
    
//     // Create a MutationObserver to detect class changes on html element
//     const observer = new MutationObserver(mutations => {
//       mutations.forEach(mutation => {
//         if (mutation.attributeName === 'class') {
//           const htmlElement = document.documentElement;
//           const isDark = htmlElement.classList.contains('dark');
//           setTheme(isDark ? 'dark' : 'light');
//         }
//       });
//     });
    
//     // Start observing the document element for class changes
//     observer.observe(document.documentElement, { attributes: true });
    
//     // Check for theme changes at regular intervals as a fallback
//     const intervalId = setInterval(() => {
//       const currentTheme = localStorage.getItem("theme") || "light";
//       if (currentTheme !== theme) {
//         setTheme(currentTheme);
//       }
//     }, 1000);
    
//     // Clean up
//     return () => {
//       window.removeEventListener("storage", handleThemeChange);
//       observer.disconnect();
//       clearInterval(intervalId);
//     };
//   }, [theme]);

//   if (!user) return <div>Loading...</div>;

//   const isCurrentUser = currentUser?.id === user.id;

//   return (
//     <div className={`profile ${theme === "dark" ? "dark" : ""}`}>
//       <div className="images">
//         <img
//           src={user.coverPic}
//           alt=""
//           className="cover"
//         />
//         <img
//           src={user.profilePic}
//           alt=""
//           className="profilePic"
//         />
//       </div>
//       <div className="profileContainer">
//         <div className="uInfo">
//           <div className="left">
//             <a href="http://facebook.com">
//               <FacebookTwoToneIcon fontSize="large" />
//             </a>
//             <a href="http://facebook.com">
//               <InstagramIcon fontSize="large" />
//             </a>
//             <a href="http://facebook.com">
//               <LinkedInIcon fontSize="large" />
//             </a>
//           </div>
//           <div className="center">
//             <span>{user.name}</span>
//           </div>
//           <div className="right">
//             <EmailOutlinedIcon />
//             {!isCurrentUser && <button>follow</button>}
//           </div>
//         </div>
//         {isCurrentUser && <Share />}
//         <Posts userId={user.id} />
//       </div>
//     </div>
//   );
// };

// export default Profile;





import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import { useUser, useClerk } from "@clerk/clerk-react";

const Profile = () => {
  const { id } = useParams();
  const { user: clerkUser } = useUser();
  const { user: userById } = useClerk({
    userId: id
  });
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  
  const DEFAULT_COVER_PIC = "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // Listen for theme changes - improved implementation
  useEffect(() => {
    // Function to handle theme changes
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      setTheme(currentTheme);
    };
    
    // Set up event listener for storage changes
    window.addEventListener("storage", handleThemeChange);
    
    // Create a MutationObserver to detect class changes on html element
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          const isDark = htmlElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });
    
    // Start observing the document element for class changes
    observer.observe(document.documentElement, { attributes: true });
    
    // Check for theme changes at regular intervals as a fallback
    const intervalId = setInterval(() => {
      const currentTheme = localStorage.getItem("theme") || "light";
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    }, 1000);
    
    // Clean up
    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [theme]);

  // If no user data is available yet, show loading
  if (!clerkUser || (id && !userById)) return <div>Loading...</div>;

  // Determine which user to display - current user or the requested user by ID
  const displayUser = id ? userById : clerkUser;
  
  // Get user details from Clerk
  const userName = displayUser.firstName && displayUser.lastName 
    ? `${displayUser.firstName} ${displayUser.lastName}`
    : displayUser.username || displayUser.emailAddresses[0].emailAddress.split('@')[0];
    
  const profilePic = displayUser.imageUrl || displayUser.profileImageUrl;
  const userId = displayUser.id;
  
  const isCurrentUser = clerkUser.id === userId;

  return (
    <div className={`profile ${theme === "dark" ? "dark" : ""}`}>
      <div className="images">
        <img
          src={DEFAULT_COVER_PIC}
          alt="Cover"
          className="cover"
        />
        <img
          src={profilePic}
          alt="Profile"
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
            <span>{userName}</span>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            {!isCurrentUser && <button>follow</button>}
          </div>
        </div>
        {isCurrentUser && <Share />}
        <Posts userId={userId} />
      </div>
    </div>
  );
};

export default Profile;