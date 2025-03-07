import React, { useState } from 'react'; 
import styles from "./LoginRegister.module.css";
import googleIcon from '../../assets/website/google_icon.png';
import fbIcon from '../../assets/website/fb_icon.png';
import instagramIcon from '../../assets/website/instagram_icon.png';

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);
  
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const toggleToRegister = () => setIsActive(true);
  const toggleToLogin = () => setIsActive(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert("All fields are required");
      return;
    }
    alert(`Logged in with username: ${loginUsername}`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerUsername || !registerEmail || !registerPassword) {
      alert("All fields are required");
      return;
    }
    alert(`Registered with username: ${registerUsername}`);
  };

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
      <div className={`${styles.formBox} ${styles.login}`}>
        <form onSubmit={handleLoginSubmit}>
        <h2 className={styles.h2}>Login</h2>
          <div className={styles.inputBox}>
            <input 
              type="text" 
              placeholder="Username" 
              value={loginUsername} 
              onChange={(e) => setLoginUsername(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.inputBox}>
            <input 
              type="password" 
              placeholder="Password" 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.forgotLink}>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className={styles.btn}>Login</button>
          <p>or login with social platforms</p>
          <div className={styles.socialIcons}>
            <a href="#"><img src={googleIcon} alt="Google Icon" /></a>
            <a href="#"><img src={instagramIcon} alt="Instagram Icon" /></a>
            <a href="#"><img src={fbIcon} alt="Facebook Icon" /></a>
          </div>
        </form>
      </div>

      <div className={`${styles.formBox} ${styles.register}`}>
        <form onSubmit={handleRegisterSubmit}>
         <h2 className={styles.h2}>Registration</h2>
          <div className={styles.inputBox}>
            <input 
              type="text" 
              placeholder="Username" 
              value={registerUsername} 
              onChange={(e) => setRegisterUsername(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.inputBox}>
            <input 
              type="email" 
              placeholder="Email" 
              value={registerEmail} 
              onChange={(e) => setRegisterEmail(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.inputBox}>
            <input 
              type="password" 
              placeholder="Password" 
              value={registerPassword} 
              onChange={(e) => setRegisterPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className={styles.btn}>Register</button>
          <p>or register with social platforms</p>
          <div className={styles.socialIcons}>
            <a href="#"><img src={googleIcon} alt="Google Icon" /></a>
            <a href="#"><img src={instagramIcon} alt="Instagram Icon" /></a>
            <a href="#"><img src={fbIcon} alt="Facebook Icon" /></a>
          </div>
        </form>
      </div>

      <div className={styles.toggleBox}>
        <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
          <h1 className={styles.h1}>Hello, Welcome!</h1>
          <p>Already have an account?</p>
          <button className={styles.btn} onClick={toggleToRegister}>Register</button>
        </div>
        <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
          <h1 className={styles.h1}>Welcome Back!</h1>
          <p>Don't have an account?</p>
          <button className={styles.btn} onClick={toggleToLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
