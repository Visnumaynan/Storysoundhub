// import React, { useState } from 'react'; 
// import { 
//   SignedIn, 
//   SignedOut, 
//   UserButton, 
//   useUser, 
//   SignIn, 
//   SignUp 
// } from '@clerk/clerk-react';
// import styles from "./LoginRegister.module.css";
// import googleIcon from '../../assets/website/google_icon.png';
// import fbIcon from '../../assets/website/fb_icon.png';
// import instagramIcon from '../../assets/website/instagram_icon.png';



//   return (
//     <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
//       <div className={`${styles.formBox} ${styles.login}`}>
//         <form >
//         <h2 className={styles.h2}>Login</h2>
//           <button type="submit" className={styles.btn}>SignIn</button>
//           <p>or login with social platforms</p>
//           <div className={styles.socialIcons}>
//             <a href="#"><img src={googleIcon} alt="Google Icon" /></a>
//             <a href="#"><img src={instagramIcon} alt="Instagram Icon" /></a>
//             <a href="#"><img src={fbIcon} alt="Facebook Icon" /></a>
//           </div>
//         </form>
//       </div>

//       <div className={`${styles.formBox} ${styles.register}`}>
//         <form>
//          <h2 className={styles.h2}>Registration</h2>
//           <button type="submit" className={styles.btn}>SignUp</button>
//           <p>or register with social platforms</p>
//           <div className={styles.socialIcons}>
//             <a href="#"><img src={googleIcon} alt="Google Icon" /></a>
//             <a href="#"><img src={instagramIcon} alt="Instagram Icon" /></a>
//             <a href="#"><img src={fbIcon} alt="Facebook Icon" /></a>
//           </div>
//         </form>
//       </div>

//       <div className={styles.toggleBox}>
//         <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
//           <h1 className={styles.h1}>Hello, Welcome!</h1>
//           <p>Already have an account?</p>
//           <button className={styles.btn} onClick={toggleToRegister}>Register</button>
//         </div>
//         <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
//           <h1 className={styles.h1}>Welcome Back!</h1>
//           <p>Don't have an account?</p>
//           <button className={styles.btn} onClick={toggleToLogin}>Login</button>
//         </div>
//       </div>
//     </div>
//   );

// export default LoginRegister;



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
//   const [isActive, setIsActive] = useState(false);

//   const toggleToRegister = () => setIsActive(true);
//   const toggleToLogin = () => setIsActive(false);

//   return (
//     <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
//       {/* Login Section */}
//       <div className={`${styles.formBox} ${styles.login}`}>
//         <h2 className={styles.h2}>Login</h2>
//         <SignedOut>
//           <SignIn
//             appearance={{
//               elements: {
//                 formButtonPrimary: styles.btn,
//                 socialButtonsBlockButton: `${styles.socialIcons} flex items-center justify-center`,
//                 card: 'bg-transparent shadow-none',
//                 headerTitle: 'hidden',
//                 headerSubtitle: 'hidden',
//               }
//             }}
//             signUpUrl="/loginRegister#register"
//             afterSignInUrl="/"
//           />
//         </SignedOut>
//         <SignedIn>
//           <div className="text-center">
//             <p>You are signed in!</p>
//             <UserButton 
//               afterSignOutUrl="/loginRegister"
//             />
//           </div>
//         </SignedIn>
//       </div>

//       {/* Register Section */}
//       <div className={`${styles.formBox} ${styles.register}`}>
//         <h2 className={styles.h2}>Registration</h2>
//         <SignedOut>
//           <SignUp
//             appearance={{
//               elements: {
//                 formButtonPrimary: styles.btn,
//                 socialButtonsBlockButton: `${styles.socialIcons} flex items-center justify-center`,
//                 card: 'bg-transparent shadow-none',
//                 headerTitle: 'hidden',
//                 headerSubtitle: 'hidden',
//               }
//             }}
//             signInUrl="/loginRegister"
//             afterSignUpUrl="/"
//           />
//         </SignedOut>
//         <SignedIn>
//           <div className="text-center">
//             <p>You are signed in!</p>
//             <UserButton 
//               afterSignOutUrl="/loginRegister"
//             />
//           </div>
//         </SignedIn>
//       </div>

//       {/* Toggle Panels */}
//       <div className={styles.toggleBox}>
//         <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
//           <h1 className={styles.h1}>Hello, Welcome!</h1>
//           <p>Already have an account?</p>
//           <button className={styles.btn} onClick={toggleToRegister}>
//             Register
//           </button>
//         </div>
//         <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
//           <h1 className={styles.h1}>Welcome Back!</h1>
//           <p>Don't have an account?</p>
//           <button className={styles.btn} onClick={toggleToLogin}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;







import React, { useState } from 'react';
import { 
  SignedIn, 
  SignedOut, 
  UserButton, 
  SignIn, 
  SignUp 
} from '@clerk/clerk-react';
import styles from "./LoginRegister.module.css";
import googleIcon from '../../assets/website/google_icon.png';
import fbIcon from '../../assets/website/fb_icon.png';
import instagramIcon from '../../assets/website/instagram_icon.png';

const LoginRegister = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleSignInClick = () => setShowSignIn(true);
  const handleSignUpClick = () => setShowSignIn(false);

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