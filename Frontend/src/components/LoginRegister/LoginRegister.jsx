// import React, { useState } from 'react';
// import { 
//   SignedIn, 
//   SignedOut, 
//   UserButton, 
//   SignIn, 
//   SignUp 
// } from '@clerk/clerk-react';
// import styles from "./LoginRegister.module.css";
// import googleIcon from '../../assets/website/google_icon.png';
// import fbIcon from '../../assets/website/fb_icon.png';
// import instagramIcon from '../../assets/website/instagram_icon.png';

// const LoginRegister = () => {
//   const [showSignIn, setShowSignIn] = useState(true);

//   const handleSignInClick = () => setShowSignIn(true);
//   const handleSignUpClick = () => setShowSignIn(false);

//   return (
//     <div className={styles.container}>
//       {/* Navigation Buttons */}
//       <div className={styles.buttonContainer}>
//         <button 
//           className={`${styles.navBtn} ${showSignIn ? styles.active : ''}`} 
//           onClick={handleSignInClick}
//         >
//           Sign In
//         </button>
//         <button 
//           className={`${styles.navBtn} ${!showSignIn ? styles.active : ''}`} 
//           onClick={handleSignUpClick}
//         >
//           Sign Up
//         </button>
//       </div>

//       {/* Card Container */}
//       <div className={styles.card}>
//         <div className={styles.formContainer}>
//           {showSignIn ? (
//             <div className={styles.formBox}>
//               <h2 className={styles.h2}>Login</h2>
//               <SignedOut>
//                 <SignIn
//                   appearance={{
//                     elements: {
//                       formButtonPrimary: styles.btn,
//                       socialButtonsBlockButton: `${styles.socialIcons} flex items-center justify-center`,
//                       card: 'bg-transparent shadow-none',
//                       headerTitle: 'hidden',
//                       headerSubtitle: 'hidden',
//                     }
//                   }}
//                   signUpUrl="/loginRegister#signup"
//                   afterSignInUrl="/"
//                 />
//               </SignedOut>
//               <SignedIn>
//                 <div className="text-center">
//                   <p>You are signed in!</p>
//                   <UserButton 
//                     afterSignOutUrl="/loginRegister"
//                   />
//                 </div>
//               </SignedIn>
//             </div>
//           ) : (
//             <div className={styles.formBox}>
//               <h2 className={styles.h2}>Registration</h2>
//               <SignedOut>
//                 <SignUp
//                   appearance={{
//                     elements: {
//                       formButtonPrimary: styles.btn,
//                       socialButtonsBlockButton: `${styles.socialIcons} flex items-center justify-center`,
//                       card: 'bg-transparent shadow-none',
//                       headerTitle: 'hidden',
//                       headerSubtitle: 'hidden',
//                     }
//                   }}
//                   signInUrl="/loginRegister"
//                   afterSignUpUrl="/"
//                 />
//               </SignedOut>
//               <SignedIn>
//                 <div className="text-center">
//                   <p>You are signed in!</p>
//                   <UserButton 
//                     afterSignOutUrl="/loginRegister"
//                   />
//                 </div>
//               </SignedIn>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;







import React, { useState, useEffect } from 'react';
import { 
  SignedIn, 
  SignedOut, 
  UserButton, 
  SignIn, 
  SignUp,
  useAuth,
  useUser
} from '@clerk/clerk-react';
import styles from "./LoginRegister.module.css";
import googleIcon from '../../assets/website/google_icon.png';
import fbIcon from '../../assets/website/fb_icon.png';
import instagramIcon from '../../assets/website/instagram_icon.png';
import axios from 'axios';

const LoginRegister = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [userSaved, setUserSaved] = useState(false); // Track if user was already saved

  const handleSignInClick = () => setShowSignIn(true);
  const handleSignUpClick = () => setShowSignIn(false);

  const saveUserToDatabase = async (userData) => {
    try {
      const base_url_api = process.env.BASE_URL_API || "http://localhost:8000";
      const response = await axios.post(`{base_url_api}/api/users`, {
        name: userData.fullName || userData.firstName || 'Unknown',
        email: userData.emailAddresses[0].emailAddress,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('User saved successfully:', response.data);
      setUserSaved(true); // Mark as saved to prevent duplicate requests
    } catch (error) {
      console.error('Error saving user to database:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // Check if auth and user data are loaded, user is signed in, and hasn't been saved yet
    if (authLoaded && userLoaded && isSignedIn && user && !userSaved) {
      saveUserToDatabase(user);
    }
  }, [authLoaded, userLoaded, isSignedIn, user, userSaved]);

  return (
    <div className={styles.container}>
      {/* Navigation Buttons */}
      <div className={styles.buttonContainer}>
        <button 
          className={`${styles.navBtn} ${showSignIn ? styles.active : ''}`} 
          onClick={handleSignInClick}
        >
          Sign In
        </button>
        <button 
          className={`${styles.navBtn} ${!showSignIn ? styles.active : ''}`} 
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </div>

      {/* Card Container */}
      <div className={styles.card}>
        <div className={styles.formContainer}>
          {showSignIn ? (
            <div className={styles.formBox}>
              <h2 className={styles.h2}>Login</h2>
              <SignedOut>
                <SignIn
                  appearance={{
                    elements: {
                      formButtonPrimary: styles.btn,
                      socialButtonsBlockButton: `${styles.socialIcons} flex items-center justify-center`,
                      card: 'bg-transparent shadow-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                    }
                  }}
                  signUpUrl="/loginRegister#signup"
                  afterSignInUrl="/"
                />
              </SignedOut>
              <SignedIn>
                <div className="text-center">
                  <p>You are signed in!</p>
                  <UserButton 
                    afterSignOutUrl="/loginRegister"
                  />
                </div>
              </SignedIn>
            </div>
          ) : (
            <div className={styles.formBox}>
              <h2 className={styles.h2}>Registration</h2>
              <SignedOut>
                <SignUp
                  appearance={{
                    elements: {
                      formButtonPrimary: styles.btn,
                      socialButtonsBlockButton: `${styles.socialIcons} flex items-center justify-center`,
                      card: 'bg-transparent shadow-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                    }
                  }}
                  signInUrl="/loginRegister"
                  afterSignUpUrl="/"
                />
              </SignedOut>
              <SignedIn>
                <div className="text-center">
                  <p>You are signed in!</p>
                  <UserButton 
                    afterSignOutUrl="/loginRegister"
                  />
                </div>
              </SignedIn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;