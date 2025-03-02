import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginRegister from "./components/LoginRegister/LoginRegister.jsx"; 
import Books from "./components/BooksSlider/Books.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar />
        <Routes>
        <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Footer />
              </>
            }
          />
          {/* Login/Register Page Route */}
          <Route path="/loginRegister" 
          element={
          <>
          <LoginRegister /> 
          <Footer />
          </>
        } />
        <Route
            path="/shop"
            element={
              <>
                <Books />
                <Footer />
              </>
            }
          />

        <Route 
            path="/product-details/:id" 
            element={
              <>
                <ProductDetails /> 
                <Footer />
              </>
            } 
          /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;