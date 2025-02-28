import React from "react";
import Img1 from "../../assets/books/book2.jpg";
import Img2 from "../../assets/books/book1.jpg";
import Img3 from "../../assets/books/book3.jpg";
import { FaStar } from "react-icons/fa";
import styles from "./Services.module.css"; // Correct import

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
      <div className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesHeader}>
            <h1>Books</h1>
          </div>
          <div className={styles.servicesGrid}>
            {ServicesData.map((service) => (
              <div key={service.id} className={styles.serviceCard} data-aos="zoom-in">
                <div className={styles.serviceImage}>
                  <img src={service.img} alt={service.title} />
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceRating}>
                    <FaStar className={styles.starIcon} />
                    <FaStar className={styles.starIcon} />
                    <FaStar className={styles.starIcon} />
                    <FaStar className={styles.starIcon} />
                  </div>
                  <h1>{service.title}</h1>
                  <p>{service.description}</p>
                  <button className={styles.orderButton} onClick={handleOrderPopup}>
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
