
import errorImage from '../../assets/Images/404.jpg'; 
import "./erorPage.css";

const ErrorPage = () => {
  return (
    <div>
      <Navbar/>
    <div className="error-container">
      <img src={errorImage} alt="404 Not Found" className="error-image" />
      
    </div>
    <Footer/>
    </div>
  );
};

export default ErrorPage;