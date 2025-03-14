import React, { useState } from "react";
import Img1 from "../../assets/books/book2.jpg";
import Img2 from "../../assets/books/book1.jpg";
import Img3 from "../../assets/books/book3.jpg";
import { FaStar, FaStarHalfAlt, FaBookOpen, FaShoppingCart } from "react-icons/fa";
import styles from "./Services.module.css";

const booksData = [
  {
    id: 1,
    img: Img1,
    title: "Artificial Intelligence ",
    rating: 4.5,
    price: "$24.99",
    category: "Technology"
  },
  {
    id: 2,
    img: Img2,
    title: "Sands of Eppla",
    rating: 4.8,
    price: "$18.99",
    category: "Fiction"
  },
  {
    id: 3,
    img: Img3,
    title: "It Ends With Us",
    rating: 4.2,
    price: "$16.99",
    category: "Romance"
  },
  {
    id: 2,
    img: Img2,
    title: "Sands of Eppla",
    rating: 4.8,
    price: "$18.99",
    category: "Fiction"
  },
  {
    id: 3,
    img: Img3,
    title: "It Ends With Us",
    rating: 4.2,
    price: "$16.99",
    category: "Romance"
  },
  {
    id: 1,
    img: Img1,
    title: "Artificial Intelligence ",
    rating: 4.5,
    price: "$24.99",
    category: "Technology"
  },
];

const Books = ({ handleOrderPopup }) => {
  const [hoveredBook, setHoveredBook] = useState(null);

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className={styles.starIcon} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className={styles.starIcon} />);
    }

    return stars;
  };

  return (
    <section id="books" className={styles.booksSection}>
      <div className={styles.container}>
        <div className={styles.booksHeader}>
          <h2>Featured Books</h2>
          <p>Discover our handpicked selection of bestselling titles</p>
        </div>
        
        <div className={styles.booksGrid}>
          {booksData.map((book) => (
            <div 
              key={book.id} 
              className={styles.bookCard}
              data-aos="fade-up"
              data-aos-delay={book.id * 100}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <div className={styles.bookImageContainer}>
                <img src={book.img} alt={book.title} className={styles.bookImage} />
                <div className={styles.bookCategory}>{book.category}</div>
                
                {hoveredBook === book.id && (
                  <div className={styles.quickActions}>
                    <button className={styles.previewButton}>
                      <FaBookOpen /> Preview
                    </button>
                  </div>
                )}
              </div>
              
              <div className={styles.bookContent}>
                <div className={styles.bookRating}>
                  {renderRating(book.rating)}
                  <span className={styles.ratingNumber}>{book.rating}</span>
                </div>
                
                <h3 className={styles.bookTitle}>{book.title}</h3>
                
                <div className={styles.bookFooter}>
                  <div className={styles.bookPrice}>{book.price}</div>
                  <button 
                    className={styles.orderButton} 
                    onClick={handleOrderPopup}
                    aria-label={`Order ${book.title}`}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;