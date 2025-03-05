import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review Submitted:", review);
    alert("Thank you for your review!");
    navigate("/"); 
  };

  return (
    <div className="add-reviews-container">
      <h2>Add Your Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={review.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />

        <label>Rating:</label>
        <select name="rating" value={review.rating} onChange={handleChange} required>
          <option value="">Select Rating</option>
          <option value="1">⭐ 1</option>
          <option value="2">⭐⭐ 2</option>
          <option value="3">⭐⭐⭐ 3</option>
          <option value="4">⭐⭐⭐⭐ 4</option>
          <option value="5">⭐⭐⭐⭐⭐ 5</option>
        </select>

        <label>Comment:</label>
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
