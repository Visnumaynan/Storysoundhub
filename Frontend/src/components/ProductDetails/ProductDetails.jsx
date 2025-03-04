import React, { useState ,useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { FaStar } from "react-icons/fa6";
import "./ProductDetails.css";

const booksData = [
  [
    {
      "id": 1,
      "img": Book1,
      "title": "Sands of Eppla",
      "rating": 5.0,
      "author": "Janeal Falor",
      "description": "A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world A thrilling fantasy adventure set in a mystical world.",
      "price": 1300,
      "bookType": "Novel",
      "reviews": [
        {
          "userName": "JohnDoe",
          "userId": "1",
          "review": "Amazing book! A true adventure that kept me hooked from start to finish."
        }
        ,
        {
          "userName": "LifeExplorer",
          "userId": "7",
          "review": "A thought-provoking book that explores life's many paths. A must-read for anyone feeling lost.💖💖"
        },
        {
          "userName": "ReadingRaven",
          "userId": "9",
          "review": "Inspiring and empowering. This memoir shows the importance of education and perseverance.🥰"
        }
      ]
    },
    {
      "id": 2,
      "img": Book2,
      "title": "Artificial Intelligence & Generative AI for Beginners",
      "rating": 4.5,
      "author": "John",
      "description": "An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts An introduction to AI and Generative AI concepts.",
      "price": 3000,
      "bookType": "Technology",
      "reviews": [
        {
          "userName": "Alice123",
          "userId": "2",
          "review": "Very informative and easy to understand for beginners. A great introduction to AI!👌🏻😍"
        }
      ]
    },
    {
      "id": 3,
      "img": Book3,
      "title": "It Ends With Us",
      "rating": 4.7,
      "author": "Lost Girl",
      "description": "A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing A powerful story of love, loss, and healing.",
      "price": 6000,
      "bookType": "Novel",
      "reviews": [
        {
          "userName": "Samantha_K",
          "userId": "3",
          "review": "A deeply emotional read. I couldn't put it down, and it really made me reflect on my own life.🥹🥹"
        }
        ,
        {
          "userName": "LifeExplorer",
          "userId": "7",
          "review": "A thought-provoking book that explores life's many paths. A must-read for anyone feeling lost.💖💖"
        },
        {
          "userName": "ReadingRaven",
          "userId": "9",
          "review": "Inspiring and empowering. This memoir shows the importance of education and perseverance.🥰"
        }
      ]
    },
    {
      "id": 4,
      "img": Book2,
      "title": "Artificial Intelligence & Generative AI for Beginners",
      "rating": 4.4,
      "author": "Someone",
      "description": "A detailed guide on AI with practical applications A detailed guide on AI with practical applications A detailed guide on AI with practical applications A detailed guide on AI with practical applications A detailed guide on AI with practical applications.",
      "price": 3600,
      "bookType": "Technology",
      "reviews": [
        {
          "userName": "TechGeek91",
          "userId": "4",
          "review": "Great resource, but could have used more real-world examples. Overall, a solid introduction.👍"
        }
      ]
    },
    {
      "id": 5,
      "img": Book1,
      "title": "Sands of Eppla",
      "rating": 5.0,
      "author": "Janeal Falor",
      "description": "A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla A continuation of the epic journey in Eppla.",
      "price": 5040,
      "bookType": "Novel",
      "reviews": [
        {
          "userName": "BookLover89",
          "userId": "5",
          "review": "An incredible continuation to a fantastic series! The world-building is top-notch.👍"
        }
        ,
        {
          "userName": "LifeExplorer",
          "userId": "7",
          "review": "A thought-provoking book that explores life's many paths. A must-read for anyone feeling lost.💖💖"
        },
        {
          "userName": "ReadingRaven",
          "userId": "9",
          "review": "Inspiring and empowering. This memoir shows the importance of education and perseverance.🥰"
        }
      ]
    },
    {
      "id": 6,
      "img": Book2,
      "title": "Machine Learning Mastery",
      "rating": 4.3,
      "author": "Tech Enthusiast",
      "description": "Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML Master the basics and advanced concepts of ML.",
      "price": 1890,
      "bookType": "Memoir",
      "reviews": [
        {
          "userName": "DevMaster23",
          "userId": "6",
          "review": "Good book for those starting with machine learning, but it gets a bit too technical at times."
        }
        ,
        {
          "userName": "LifeExplorer",
          "userId": "7",
          "review": "A thought-provoking book that explores life's many paths. A must-read for anyone feeling lost.💖💖"
        },
        {
          "userName": "ReadingRaven",
          "userId": "9",
          "review": "Inspiring and empowering. This memoir shows the importance of education and perseverance.🥰"
        }
      ]
    },
    {
      "id": 7,
      "img": Book3,
      "title": "The Midnight Library",
      "rating": 4.6,
      "author": "Matt Haig",
      "description": "A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices A novel exploring infinite possibilities in life choices.",
      "price": 2580,
      "bookType": "Novel",
      "reviews": [
        {
          "userName": "LifeExplorer",
          "userId": "7",
          "review": "A thought-provoking book that explores life's many paths. A must-read for anyone feeling lost.😍"
        }
        ,
        {
          "userName": "LifeExplorer",
          "userId": "7",
          "review": "A thought-provoking book that explores life's many paths. A must-read for anyone feeling lost.💖💖"
        },
        {
          "userName": "ReadingRaven",
          "userId": "9",
          "review": "Inspiring and empowering. This memoir shows the importance of education and perseverance.🥰"
        }
      ]
    },
    {
      "id": 8,
      "img": Book1,
      "title": "The Silent Patient",
      "rating": 4.8,
      "author": "Alex Michaelides",
      "description": "A psychological thriller with a shocking twist.",
      "price": 4630,
      "bookType": "History",
      "reviews": [
        {
          "userName": "ThrillerFan42",
          "userId": "8",
          "review": "This book was mind-blowing! A brilliant twist that I never saw coming.👌🏻"
        },
        {
          "userName": "LifeExplorer",
          "userId": "7",
          "review": "A thought-provoking book that explores life's many paths. A must-read for anyone feeling lost.💖💖"
        },
        {
          "userName": "ReadingRaven",
          "userId": "9",
          "review": "Inspiring and empowering. This memoir shows the importance of education and perseverance.🥰"
        }
      ]
    },
    {
      "id": 9,
      "img": Book2,
      "title": "Educated: A Memoir",
      "rating": 4.9,
      "author": "Tara Westover",
      "description": "A memoir about overcoming adversity through education.",
      "price": 2720,
      "bookType": "Technology",
      "reviews": [
        {
          "userName": "ReadingRaven",
          "userId": "9",
          "review": "Inspiring and empowering. This memoir shows the importance of education and perseverance.👌🏻"
        }
      ]
    },
    {
      "id": 10,
      "img": Book3,
      "title": "The Alchemist",
      "rating": 5.0,
      "author": "Paulo Coelho",
      "description": "A timeless story about following one's dreams.",
      "price": 1560,
      "bookType": "History",
      "reviews": [
        {
          "userName": "Dreamer1",
          "userId": "10",
          "review": "A beautifully written story about the pursuit of one's personal legend. Truly inspiring 🥰."
        }
      ]
    },
    {
      "id": 11,
      "img": Book1,
      "title": "The Book Thief",
      "rating": 4.5,
      "author": "Markus Zusak",
      "description": "A heart-wrenching story set during World War II.",
      "price": 100,
      "bookType": "Horror",
      "reviews": [
        {
          "userName": "HistoryBuff23",
          "userId": "11",
          "review": "A profound and moving tale, beautifully narrated. One of my all-time favorites👻."
        }
      ]
    }
  ]
  
      
];

const flattenedBooks = booksData.flat(); // Flatten the array

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = flattenedBooks.find((b) => b.id === parseInt(id)); // Find the book by ID
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!book) {
    return <h2>Book Not Found</h2>;
  }

  const words = book.description.split(" ");
  const isLongDescription = words.length > 20;
  const shortDescription = words.slice(0, 20).join(" ") + "..";

  const suggestedBooks = flattenedBooks.filter((b) => b.bookType === book.bookType && b.id !== book.id);

  useEffect(() => {
    if (showReviews) {
      const reviewsSection = document.getElementById("reviews-section");
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [showReviews]); // Runs when showReviews changes
  
  const handleReviewClick = () => {
    setShowReviews(prevState => !prevState);
    setTimeout(() => {
      const reviewsSection = document.getElementById("reviews-section");
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50); 
  };
  

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img src={book.img} alt={book.title} className="book-image-large" />
        <div className="book-info">
          <h1>{book.title}</h1>
          <p><strong></strong> {book.author}</p>
          <div className="book-rating">
            <FaStar className="star-icon" />
            <span>{book.rating}</span>
            <button onClick={handleReviewClick} className="reviews-btn">
              See Customer Reviews
            </button>
          </div>

          <p><strong></strong> {showFullDescription ? book.description : shortDescription}</p>

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
              <div
                key={sBook.id}
                className="suggested-item"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/product-details/${sBook.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={sBook.img} alt={sBook.title} className="suggested-img" />
                <p>{sBook.title}</p>
                <p className="book-author">{sBook.author}</p>
                <div className="book-rating">
                  <FaStar className="star-icon" />
                  <span>{sBook.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showReviews && (
        <div id="reviews-section" className="reviews-container">
          <h2>Book Reviews</h2>
          <div className="reviews">
            {book.reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.userName}:</strong> {review.review}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;