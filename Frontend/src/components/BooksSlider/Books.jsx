import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaPlus, FaStar } from "react-icons/fa";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="books-container">
      <div className="books-header">
        <h2 className="books-title">Discover Books</h2>
        <p className="books-subtitle">Find your next favorite read</p>
      </div>

      <div className="top-bar">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="add-book-button" onClick={() => navigate("/BookForm")}>
          <FaPlus />
        </button>
      </div>

      {isLoading ? (
        <p>Loading books...</p>
      ) : (
        <div className="books-grid">
          {filteredBooks.map(({ id, title, author, picture, price }) => (
            <div key={id} className="book-card" onClick={() => navigate(`/books/${id}`)}>
              <img src={picture} alt={title} className="book-image" />
              <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <p className="book-author">by {author}</p>
                <p className="book-price">${price}</p>
                <FaStar className="star-icon" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
