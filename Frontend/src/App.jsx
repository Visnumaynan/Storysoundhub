import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Primary components (from second App)
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Books from "./components/BooksSlider/Books";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import BookForm from "./components/BookForm/BookForm";
import AddReviews from "./components/AddReviews/AddReviews";
import CartPage from "./components/CartPage/CartPage";

// Secondary components (from first App)
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import BookClubProfile from "./pages/bookClubProfile/BookClubProfile";
import BookClubs from "./pages/bookClubs/BookClubs";

// Context from first App
import { UserProvider } from "./context/UserContext";

// Styles
import "./style.scss";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  // Primary layout (from second App)
  const MainLayout = ({ children }) => {
    return (
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar />
        {children}
        <Footer />
      </div>
    );
  };

  // Social/Book Club layout (from first App)
  const BookClubLayout = ({ children }) => {
    return (
      <div className={"theme-light"}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            {children}
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Primary routes (E-commerce) */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Hero />
                <Services />
              </MainLayout>
            }
          />
          <Route 
            path="/loginRegister" 
            element={
              <MainLayout>
                <LoginRegister />
              </MainLayout>
            } 
          />
          <Route
            path="/shop"
            element={
              <MainLayout>
                <Books />
              </MainLayout>
            }
          />
          <Route 
            path="/product-details/:id" 
            element={
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            } 
          />
          <Route 
            path="/BookForm" 
            element={
              <MainLayout>
                <BookForm />
              </MainLayout>
            } 
          />
          <Route 
            path="/AddReviews" 
            element={
              <MainLayout>
                <AddReviews />
              </MainLayout>
            } 
          />
          <Route 
            path="/CartPage" 
            element={
              <MainLayout>
                <CartPage />
              </MainLayout>
            } 
          />

          {/* Book Club routes */}
          <Route 
            path="/book-club-home" 
            element={
              <BookClubLayout>
                <Home />
              </BookClubLayout>
            } 
          />
          <Route 
            path="/profile/:id" 
            element={
              <BookClubLayout>
                <Profile />
              </BookClubLayout>
            } 
          />
          <Route 
            path="/book-club/:id" 
            element={
              <BookClubLayout>
                <BookClubProfile />
              </BookClubLayout>
            } 
          />
          <Route 
            path="/book-clubs" 
            element={
              <BookClubLayout>
                <BookClubs />
              </BookClubLayout>
            } 
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;