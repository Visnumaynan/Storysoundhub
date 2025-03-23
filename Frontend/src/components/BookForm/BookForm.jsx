import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./BookForm.css"; 
import BookFormWall from "../../assets/website/BookFormWall.jpg";

const BookForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/books", data);
      console.log("Book added successfully:", response.data);
      alert("Book added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding book:", error.response?.data || error.message);
      alert("Failed to add book!");
    }
  };

  return (
    <div className="book-form-container">
      <div className="image-side">
        <img src={BookFormWall} alt="Book Form Background" className="form-image" />
      </div>
      <div className="form-card">
        <h2 className="form-title">Add a New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="book-form">
          <div className="form-group">
            <input {...register("title", { required: true })} type="text" placeholder="Title" required />
            <input {...register("isbn")} type="text" placeholder="ISBN (optional)" />
          </div>
          <div className="form-group">
            <input {...register("author", { required: true })} type="text" placeholder="Author" required />
            <input {...register("type", { required: true })} type="text" placeholder="Type" required />
          </div>
          <div className="form-group">
            <input {...register("genre_id", { required: true })} type="text" placeholder="Genre ID" required />
            <input {...register("price", { required: true, min: 0, valueAsNumber: true })} type="number" placeholder="Price" required />
          </div>
          <div className="form-group">
            <input {...register("owner_id", { required: true })} type="text" placeholder="Owner ID" required />
            <input {...register("condition", { required: true })} type="text" placeholder="Condition" required />
          </div>
          <div className="form-group">
            <input {...register("quantity", { required: true, min: 1, valueAsNumber: true })} type="number" placeholder="Quantity" required />
            <input {...register("picture", { required: true })} type="text" placeholder="Image URL" required />
          </div>
          <input {...register("short_description")} type="text" placeholder="Short Description (optional)" />
          <button type="submit" className="submit-button">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
