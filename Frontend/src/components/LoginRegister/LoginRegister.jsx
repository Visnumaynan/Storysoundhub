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