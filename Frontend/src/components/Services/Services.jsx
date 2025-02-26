import React from "react";
import Img1 from "../../assets/books/book2.jpg";
import Img2 from "../../assets/books/book1.jpg";
import Img3 from "../../assets/books/book3.jpg";
import { FaStar } from "react-icons/fa";
import "./Services.css";


const ServicesData = [
  {
    id: 1,
    img: Img1,
    title: "Artificial Intelligence & Generative AI for Beginners",
  },
  {
    id: 2,
    img: Img2,
    title: "Sands of Eppla",
  },
  {
    id: 3,
    img: Img3,
    title: "It Ends With Us",
 },
];

const Services = ({ handleOrderPopup }) => {
  return (
    <>
      <span id="services"></span>
      <div className="services-section">
        <div className="container">
          <div className="services-header">
            <h1>Books</h1>
          </div>
          <div className="services-grid">
            {ServicesData.map((service) => (
              <div key={service.id} className="service-card" data-aos="zoom-in">
                <div className="service-image">
                  <img src={service.img} alt={service.title} />
                </div>
                <div className="service-content">
                  <div className="service-rating">
                    <FaStar className="star-icon" />
                    <FaStar className="star-icon" />
                    <FaStar className="star-icon" />
                    <FaStar className="star-icon" />
                  </div>
                  <h1>{service.title}</h1>
                  <p>{service.description}</p>
                  <button className="order-button" onClick={handleOrderPopup}>
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
