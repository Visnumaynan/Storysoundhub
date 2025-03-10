import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import search from "../../assets/website/search.png";
import addBook from "../../assets/website/add_book.png"; // Import Add Book Icon
import { FaStar } from "react-icons/fa6";
import "./Books.css"; // Importing external CSS

const booksData = [
  {
    id: 1,
    img: Book1,
    title: "Sands of Eppla",
    rating: 5.0,
    author: "Janeal Falor",
  },
  {
    id: 2,
    img: Book2,
    title: "Artificial Intelligence & Generative AI for Beginners",
    rating: 4.5,
    author: "John",
  },
  {
    id: 3,
    img: Book3,
    title: "It Ends With Us",
    rating: 4.7,
    author: "Lost Girl",
  },
  {
    id: 4,
    img: Book2,
    title: "Artificial Intelligence & Generative AI for Beginners",
    rating: 4.4,
    author: "Someone",
  },
  {
    id: 5,
    img: Book1,
    title: "Sands of Eppla",
    rating: 5.0,
    author: "Janeal Falor",
  },
  {
    id: 6,
    img: Book2,
    title: "Machine Learning Mastery",
    rating: 4.3,
    author: "Tech Enthusiast",
  },
  {
    id: 7,
    img: Book3,
    title: "The Midnight Library",
    rating: 4.6,
    author: "Matt Haig",
  },
  {
    id: 8,
    img: Book1,
    title: "The Silent Patient",
    rating: 4.8,
    author: "Alex Michaelides",
  },
  {
    id: 9,
    img: Book2,
    title: "A Memoir",
    rating: 4.9,
    author: "Tara Westover",
  },
  {
    id: 10,
    img: Book3,
    title: "The Alchemist",
    rating: 5.0,
    author: "Paulo Coelho",
  },
  {
    id: 11,
    img: Book1,
    title: "The Book Thief",
    rating: 4.5,
    author: "Markus Zusak",
  },
  {
    id: 12,
    img: Book2,
    title: "1984",
    rating: 4.8,
    author: "George Orwell",
  },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Filter books based on the search term
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show only the first 10 books or all books based on `showAll`
  const displayedBooks = showAll ? filteredBooks : filteredBooks.slice(0, 10);

  const bookTitleStyle = {
    fontSize: "1.0rem",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "10px",
    width:"200px"
  };

  return (
    <div className="books-container">
      <div className="container">
        {/* Top Bar with Search and Add Button */}
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search books..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="addBookButton-wrapper">
          <button className="addBookButton" onClick={() => navigate("/BookForm")}>
          <div className="plus">+</div>
          </button>
          <div className="tooltip">Add a New Book</div> {/* Tooltip Text */}
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          {displayedBooks.map(({ id, img, title, author, rating }) => (
            <div key={id} className="book-card"
            onClick={() => navigate(`/product-details/${id}`)} // Navigate to book details
            style={{ cursor: "pointer" }} // Add pointer cursor
          >
              <img src={img} alt={title} className="book-image" />
              <h3 className="book-title" style={bookTitleStyle}>{title}</h3>
              <p className="book-author">{author}</p> {/* Author Below Title */}
              <div className="book-rating">
                <FaStar className="star-icon" />
                <span>{rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All / Show Less Button */}
        {filteredBooks.length > 10 && (
          <div className="ViewAll-button-container">
            <button
              className="view-all-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Books"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
