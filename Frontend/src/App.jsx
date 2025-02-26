import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services.jsx";
import AOS from "aos";

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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
