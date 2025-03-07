import React from "react";
import { useForm } from "react-hook-form";
import "./BookForm.css"; 
import BookFormWall from "../../assets/website/BookFormWall.jpg";

const BookForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Book Data:", data);
    // Send the data to your backend API
    reset();
  };

  return (
    <div className="book-form-container">

      {/* Left side with image */}
      <div className="image-side">
        <img src={BookFormWall} alt="Book Form Background" className="form-image" />
      </div>

      <div className="form-card">
        <h2 className="form-title">Add a New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="book-form">
          <div className="form-group">
            <input {...register("book_id")} type="text" placeholder="Book ID" required />
            <input {...register("title")} type="text" placeholder="Title" required />
          </div>
          <div className="form-group">
            <input {...register("isbn")} type="text" placeholder="ISBN" required />
            <input {...register("author")} type="text" placeholder="Author" required />
          </div>
          <div className="form-group">
            <input {...register("type")} type="text" placeholder="Type" required />
            <input {...register("picture")} type="text" placeholder="Picture URL" required />
          </div>
          <div className="form-group">
            <input {...register("genre_id")} type="text" placeholder="Genre ID" required />
            <input {...register("quantity")} type="number" placeholder="Quantity" required />
          </div>
          <div className="form-group">
            <input {...register("owner_id")} type="text" placeholder="Owner ID" required />
            <input {...register("condition")} type="text" placeholder="Condition" required />
          </div>
          <div className="form-group">
            <input {...register("price")} type="number" placeholder="Price" required />
          </div>
          <div className="form-group-2">
            <label>Created At</label>
              <input {...register("created_at")} type="datetime-local" required />
            <label>Updated At</label>
              <input {...register("updated_at")} type="datetime-local" required />
          </div>
          <div className="form-group-3">
            <label>Upload book image</label>
            <input {...register("picture")} type="text" placeholder="" required />
          </div>
          <div className="form-group-2"></div>
          <button type="submit" className="submit-button">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
