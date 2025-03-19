import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "../../assets/website/star.png";
import StarIconYellow from "../../assets/website/starYellow.png";
import "./AddReviews.css";

const AddReviews = () => {
  const [review, setReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRating = (ratingValue) => {
    setReview({ ...review, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review Submitted:", review);
    alert(`Thank you for your ${review.rating}-star review!`);
    navigate("/");
  };

  return (
    <div className="add-reviews-container">
      <h2>Add Your Review</h2>


      <form onSubmit={handleSubmit} className="review-form">
      
      <p>Click to rate your experience!</p>
        <div className="star-rating">
        
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              type="button"
              className={`stars ${review.rating >= star ? "selected" : ""}`}
              onClick={() => handleRating(star)}
            >
              <img
                src={review.rating >= star ? StarIconYellow : StarIcon} 
                alt="Stars"
                className="star-icons"
              />
              
            </div>
            
          ))}
        </div>

        <p>Share your comment!</p>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReviews;

  