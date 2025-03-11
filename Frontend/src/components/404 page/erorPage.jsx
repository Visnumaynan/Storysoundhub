import React from 'react';
import errorImage from '../../assets/Images/404.jpg'; 
import Navbar from '../Navbar/Navbar'; 
import Footer from '../Footer/Footer';
import "./erorPage.css";

const ErrorPage = () => {
  return (
    <div>
      <Navbar/>
    <div className="error-container">
      <img src={errorImage} alt="404 Not Found" className="error-image" />
      <h1>Not Found</h1>
      <p>Your visited page was not found. You may go back to the home page.</p>
       <button className="error-btn">Back to Home Page</button>
    </div>
    <Footer/>
    </div>
  );
};

export default ErrorPage;