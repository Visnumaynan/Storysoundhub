import React, { useState, useEffect } from "react";
import Book1 from "../../assets/books/book2.jpg";
import Book2 from "../../assets/books/book1.jpg";
import Book3 from "../../assets/books/book3.jpg";
import Vector from "../../assets/website/blue-pattern.png";
import "./Hero.css";


const ImageList = [
  {
    id: 1,
    img: Book1,
    title: "Artificial Intelligence & Generative AI for Beginners",
    author: "John",
    description:
      "Discover the fundamentals of AI and how generative models are reshaping our digital landscape in this comprehensive guide.",
  },
  {
    id: 2,
    img: Book2,
    title: "Sands of Eppla",
    author: "Janeal Falor",
    description:
      "Journey through the mystical deserts of Eppla in this captivating adventure that will transport you to a world of magic and wonder.",
  },
  {
    id: 3,
    img: Book3,
    title: "It Ends With Us",
    author: "Hoover Colleen",
    description:
      "A heartbreaking tale of love, resilience, and the courage to break cycles that will stay with you long after the final page.",
  },
];

const Hero = ({ handleOrderPopup }) => {
  const [currentBook, setCurrentBook] = useState(ImageList[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeBook = (book) => {
    if (book.id === currentBook.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentBook(book);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="hero">
      <div className="hero-backdrop">
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text-container">
          <div className={`hero-text ${isAnimating ? 'fade' : ''}`}>
            <h1>{currentBook.title}</h1>
            <p className="author">by {currentBook.author}</p>
            <p className="description">{currentBook.description}</p>
            <button onClick={handleOrderPopup} className="cta-button">
              <span>Order Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className={`book-display ${isAnimating ? 'fade' : ''}`}>
            <div className="book-shadow"></div>
            <img 
              src={currentBook.img} 
              alt={currentBook.title} 
              className="book-cover"
            />
          </div>
          
          <div className="book-selector">
            {ImageList.map((book) => (
              <div 
                key={book.id} 
                className={`selector-item ${currentBook.id === book.id ? 'active' : ''}`}
                onClick={() => changeBook(book)}
              >
                <img src={book.img} alt={book.title} />
                <div className="selector-highlight"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;