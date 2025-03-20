import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaTruck, FaUndo, FaShieldAlt } from "react-icons/fa";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const slidesToShow = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle scroll animation for page load
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-element');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  if (!book) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-icon">📚</div>
          <h2>Book Not Found</h2>
          <p>We couldn't find the book you're looking for.</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
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

  const handleAddReviewClick = () => {
    navigate("/AddReviews");
  };

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
    }, 3000);
  };

  const nextSlide = () => {
    if (currentSlide < suggestedBooks.length - slidesToShow) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(suggestedBooks.length - slidesToShow);
    }
  };

  const originalPrice = Math.round(book.price / 0.85);
  const discount = Math.round((originalPrice - book.price) / originalPrice * 100);

  return (
    <div className="product-page-container">
      {showAddedToCart && (
        <div className="cart-notification">
          <div className="notification-content">
            <FaShoppingCart className="notification-icon" />
            <span>Added to My List Successfully!</span>
          </div>
        </div>
      )}
      <div className="product-details fade-in-element">
        <div className="product-image-container">
          <div className="image-gallery">
            <img src={book.img} alt={book.title} className="book-image-large" />
            <div className="book-type-badge">{book.bookType}</div>
            {discount > 0 && (
              <div className="discount-badge-corner">-{discount}%</div>
            )}
          </div>
        </div>

        <div className="book-info">
          <h2 className="book-title-p">{book.title}</h2>
          <p className="book-author">by <span className="author-name">{book.author}</span></p>
          
          <div className="rating-container">
            <div className="book-rating">
              <FaStar className="star-icon" />
              <span>{book.rating}</span>
            </div>
            <span className="rating-divider">•</span>
            <span className="reviews-count">{book.reviews.length} reviews</span>
            <button onClick={handleReviewClick} className="reviews-btn">
              {showReviews ? "Hide Reviews" : "View & Add Reviews"}
            </button>
          </div>

          <div className="book-description">
            <p>{showFullDescription ? book.description : shortDescription}</p>
            {isLongDescription && (
              <button
                className="read-more-btn"
                onClick={() => setShowFullDescription((prev) => !prev)}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </div>

          <div className="price-box">
            <div className="price-info">
              <span className="price">Rs.{originalPrice.toLocaleString()}</span>
            </div>
            <div className="availability">
              <span className="in-stock">✓ In Stock</span>
            </div>
          </div>

          <div className="action-container">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="buttons">
              <button className="buy-btn">Buy Now</button>
              <button className="cart-btn" onClick={handleAddToCart}>
                <FaHeart className="btn-icon" /> Add to My List</button>
            </div>
          </div>

          <div className="delivery-info">
            <div className="delivery-item">
              <span className="delivery-icon"><FaTruck /></span>
              <div className="delivery-text">
                <span className="delivery-title">Free Delivery</span>
                <span className="delivery-subtitle">Orders over Rs.7000</span>
              </div>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon"><FaUndo /></span>
              <div className="delivery-text">
                <span className="delivery-title">30-Day Returns</span>
                <span className="delivery-subtitle">No questions asked</span>
              </div>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon"><FaShieldAlt /></span>
              <div className="delivery-text">
                <span className="delivery-title">Secure Checkout</span>
                <span className="delivery-subtitle">SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {suggestedBooks.length > 0 && (
        <div className="suggested-books fade-in-element">
          <div className="section-header">
            <h2>You May Also Like</h2>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={prevSlide} aria-label="Previous books">
                <FaChevronLeft />
              </button>
              <button className="carousel-btn" onClick={nextSlide} aria-label="Next books">
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="suggested-list-container">
            <div 
              className="suggested-list" 
              style={{ 
                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {suggestedBooks.map((sBook) => (
                <div
                  key={sBook.id}
                  className="suggested-item"
                  onClick={() => {
                    navigate(`/product-details/${sBook.id}`);
                  }}
                >
                  <div className="book-card">
                    <img src={sBook.img} alt={sBook.title} className="suggested-img" />
                    <div className="book-info-hover">
                      <button className="quick-view-btn">Quick View</button>
                    </div>
                  </div>
                  <div className="suggested-item-details">
                    <h3 className="book-title">{sBook.title}</h3>
                    <p className="book-author">{sBook.author}</p>
                    <div className="book-rating">
                      <FaStar className="star-icon" />
                      <span>{sBook.rating}</span>
                    </div>
                    <p className="suggested-price">Rs.{sBook.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showReviews && (
        <div id="reviews-section" className="reviews-container fade-in-element">
          <div className="reviews-header">
            <h2>Customer Reviews</h2>
            <div className="reviews-summary">
              <div className="average-rating">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon large" />
                  ))}
                </div>
                <span className="average-rating-number">{book.rating}</span>
                <span className="reviews-count">based on {book.reviews.length} reviews</span>
              </div>
            </div>
            <button onClick={handleAddReviewClick} className="add-reviews-btn">
              Write a Review
            </button>
          </div>
          
          <div className="reviews">
            {book.reviews.map((review, index) => (
              <div key={index} className="review">
                <div className="review-author-avatar">
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <div className="review-content-container">
                  <div className="review-header">
                    <span className="review-author">{review.userName}</span>
                    <div className="review-meta">
                      <span className="review-date">March 1, 2025</span>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="star-icon" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="review-content">{review.review}</p>
                  <div className="review-footer">
                    <button className="helpful-btn">
                      <span className="helpful-icon">👍</span> Helpful (3)
                    </button>
                    <button className="reply-btn">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="reviews-pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn next">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;