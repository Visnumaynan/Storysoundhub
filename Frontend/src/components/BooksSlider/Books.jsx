import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { FaStar, FaSearch, FaPlus } from "react-icons/fa";
import "./Books.css";

// Enhanced book data with consistent information and more varied ratings
const booksData = [
  {
    id: 1,
    img: Book1,
    title: "Sands of Eppla",
    rating: 5.0,
    author: "Janeal Falor",
    featured: true
  },
  {
    id: 2,
    img: Book2,
    title: "Artificial Intelligence & Generative AI for Beginners",
    rating: 4.6,
    author: "John Miller",
    featured: false
  },
  {
    id: 3,
    img: Book3,
    title: "It Ends With Us",
    rating: 4.8,
    author: "Colleen Hoover",
    featured: true
  },
  {
    id: 4,
    img: Book2,
    title: "The Future of AI",
    rating: 4.4,
    author: "Sarah Anderson",
    featured: false
  },
  {
    id: 5,
    img: Book1,
    title: "The Kingdom Beyond",
    rating: 4.9,
    author: "Michael Stevens",
    featured: true
  },
  {
    id: 6,
    img: Book2,
    title: "Machine Learning Mastery",
    rating: 4.3,
    author: "David Chen",
    featured: false
  },
  {
    id: 7,
    img: Book3,
    title: "The Midnight Library",
    rating: 4.7,
    author: "Matt Haig",
    featured: true
  },
  {
    id: 8,
    img: Book1,
    title: "The Silent Patient",
    rating: 4.8,
    author: "Alex Michaelides",
    featured: false
  },
  {
    id: 9,
    img: Book2,
    title: " A Memoir",
    rating: 4.9,
    author: "Tara Westover",
    featured: false
  },
  {
    id: 10,
    img: Book3,
    title: "The Alchemist",
    rating: 5.0,
    author: "Paulo Coelho",
    featured: true
  },
  {
    id: 11,
    img: Book1,
    title: "The Book Thief",
    rating: 4.5,
    author: "Markus Zusak",
    featured: false
  },
  {
    id: 12,
    img: Book2,
    title: "1984",
    rating: 4.8,
    author: "George Orwell",
    featured: true
  },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animateBooks, setAnimateBooks] = useState(false);
  const booksGridRef = useRef(null);
  const navigate = useNavigate();

  // Simulate loading state with consistent timing
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before animating in the books
      setTimeout(() => {
        setAnimateBooks(true);
      }, 100);
    }, 1200);
    
    return () => clearTimeout(loadingTimer);
  }, []);

  // Handle search input changes with debounce
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Reset to not showing all when search changes
    if (showAll && e.target.value !== "") {
      setShowAll(false);
    }
  };

  // Filter books based on the search term
  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show only the first 8 books or all books based on `showAll`
  const displayedBooks = showAll ? filteredBooks : filteredBooks.slice(0, 8);

  // Sort books to show featured books first
  const sortedBooks = [...displayedBooks].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  // Handle book card click
  const handleBookClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  // Handle add book button click with animation
  const handleAddBookClick = () => {
    navigate("/BookForm");
  };

  // Handle view all/show less toggle with smooth scroll
  const toggleViewAll = () => {
    setShowAll(!showAll);
    // Scroll back to top if showing less
    if (showAll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="books-container">
      <div className="books-header">
        <h2 className="books-title">Discover Books</h2>
        <p className="books-subtitle">Find your next favorite read</p>
      </div>

      <div className="container">
        {/* Top Bar with Search and Add Button */}
              <div className="top-bar">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search books"
          />
        </div>

        {/* Wrap the button inside the tooltip container */}
        <div className="tooltip">
          <button
            className="add-book-button"
            onClick={handleAddBookClick}
            aria-label="Add new book"
          >
            <FaPlus />
          </button>
          <span className="tooltiptext">Add a new book</span>
        </div>
      </div>


        {/* Books Grid with Loading State */}
        {isLoading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="book-card skeleton"></div>
            ))}
          </div>
        ) : (
          <>
            {filteredBooks.length === 0 ? (
              <div className="no-results">
                <h3>No books found</h3>
                <p>Try a different search term or add a new book</p>
              </div>
            ) : (
              <div ref={booksGridRef} className={`books-grid ${animateBooks ? 'animate' : ''}`}>
                {sortedBooks.map(({ id, img, title, author, rating, featured }, index) => (
                  <div
                    key={id}
                    className="book-card"
                    onClick={() => handleBookClick(id)}
                    style={{ 
                      animationDelay: `${index * 0.05}s`,
                      transitionDelay: `${index * 0.05}s`
                    }}
                  >
                    <div className="book-image-container">
                      <img src={img} alt={title} className="book-image" />
                      <div className="book-overlay">
                        <span className="view-details">View Details</span>
                      </div>
                    </div>
                    <div className="book-infos">
                      <h3 className="book-title">{title}</h3>
                      <p className="book-author">by {author}</p>
                      <div className="book-rating">
                        <FaStar className="star-icon" />
                        <span>{rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View All / Show Less Button */}
            {filteredBooks.length > 8 && (
              <div className="button-container">
                <button
                  className="view-all-button"
                  onClick={toggleViewAll}
                >
                  {showAll ? "Show Less" : "View All Books"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Books;