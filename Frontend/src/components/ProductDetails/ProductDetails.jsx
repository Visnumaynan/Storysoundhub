import React, { useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { FaStar } from "react-icons/fa6";
import "./ProductDetails.css";

const booksData = [
    {
        id: 1,
        img: Book1,
        title: "Sands of Eppla",
        rating: 5.0,
        author: "Janeal Falor",
        description: "A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world.",
        price: 1300,
        bookType: "Novel"
      },
      {
        id: 2,
        img: Book2,
        title: "Artificial Intelligence & Generative AI for Beginners",
        rating: 4.5,
        author: "John",
        description: "An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts.",
        price: 3000,
         bookType: "Technology"
      },
      {
        id: 3,
        img: Book3,
        title: "It Ends With Us",
        rating: 4.7,
        author: "Lost Girl",
        description: "A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing.",
        price: 6000,
        bookType: "Novel"
      },
      {
        id: 4,
        img: Book2,
        title: "Artificial Intelligence & Generative AI for Beginners",
        rating: 4.4,
        author: "Someone",
        description: "A detailed guide on AI with practical applications A detailed guide on AI with practical applications A detailed guide on AI with practical applications A detailed guide on AI with practical applications A detailed guide on AI with practical applications.",
        price: 3600,
        bookType: "Technology"
      },
      {
        id: 5,
        img: Book1,
        title: "Sands of Eppla",
        rating: 5.0,
        author: "Janeal Falor",
        description: "A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla.",
        price: 5040,
        bookType: "Novel"
      },
      {
        id: 6,
        img: Book2,
        title: "Machine Learning Mastery",
        rating: 4.3,
        author: "Tech Enthusiast",
        description: "Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML.",
        price: 1890,
        bookType: "Memoir"
      },
      {
        id: 7,
        img: Book3,
        title: "The Midnight Library",
        rating: 4.6,
        author: "Matt Haig",
        description: "A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices.",
        price: 2580,
        bookType: "Novel"
      },
      {
        id: 8,
        img: Book1,
        title: "The Silent Patient",
        rating: 4.8,
        author: "Alex Michaelides",
        description: "A psychological thriller with a shocking twist.",
        price: 4630,
        bookType: "History"
      },
      {
        id: 9,
        img: Book2,
        title: "Educated: A Memoir",
        rating: 4.9,
        author: "Tara Westover",
        description: "A memoir about overcoming adversity through education.",
        price: 2720,
        bookType: "Technology"
      },
      {
        id: 10,
        img: Book3,
        title: "The Alchemist",
        rating: 5.0,
        author: "Paulo Coelho",
        description: "A timeless story about following one's dreams.",
        price: 1560,
        bookType: "History"
      },
      {
        id: 11,
        img: Book1,
        title: "The Book Thief",
        rating: 4.5,
        author: "Markus Zusak",
        description: "A heart-wrenching story set during World War II.",
        price: 100,
        bookType: "Horror"
      },
      
];

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = booksData.find((b) => b.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!book) {
    return <h2>Book Not Found</h2>;
  }

  const words = book.description.split(" ");
  const isLongDescription = words.length > 20;
  const shortDescription = words.slice(0, 20).join(" ") + "..";

  const suggestedBooks = booksData.filter((b) => b.bookType === book.bookType && b.id !== book.id);

  return (
    <div className="product-details-container">
    <div className="product-details">
      <img src={book.img} alt={book.title} className="book-image-large" />
      <div className="book-info">
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.author}</p>
        <div className="book-rating">
          <FaStar className="star-icon" />
          <span>{book.rating}</span>
        </div>
        
        {/* Conditionally render short or full description */}
        <p><strong></strong> {showFullDescription ? book.description : shortDescription}</p>

        {/* Read More / Less View Toggle */}
        {isLongDescription && (
          <button 
            className="read-more-btn" 
            onClick={() => setShowFullDescription((prev) => !prev)}
          >
            {showFullDescription ? "Less View" : "Read Full Overview"}
          </button>
        )}

        <h3 className="price">Rs.{book.price}</h3>

        <div className="buttons">
          {/* Quantity Selector */}
        <div className="quantity-selector">
          <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))} className="quantity-btn">-</button>
          <span className="quantity">{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)} className="quantity-btn">+</button>
        </div>

          <button className="buy-btn">Buy</button>
          <button className="wishlist-btn">Add to Cart</button>
        </div>
      </div>
    </div>

    {suggestedBooks.length > 0 && (
        <div className="suggested-books">
          <h2>Suggested Books</h2>
          <div className="suggested-list">
            {suggestedBooks.map((sBook) => (
              <div key={sBook.id} className="suggested-item"
                onClick={() => navigate(`/product-details/${sBook.id}`)} // Correctly use navigate
                style={{ cursor: "pointer" }} // Add pointer cursor
              >
                <img src={sBook.img} alt={sBook.title} className="suggested-img" />
                <p>{sBook.title}</p>
                
                <p className="book-author">{sBook.author}</p> {/* Author Below Title */}
          <div className="book-rating">
            <FaStar className="star-icon" />
            <span>{sBook.rating}</span> {/* Rating */}
          </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
