import React from "react";
import Book1 from "../../assets/books/book2.jpg";
import Book2 from "../../assets/books/book1.jpg";
import Book3 from "../../assets/books/book3.jpg";
import Vector from "../../assets/website/blue-pattern.png";
import "./Hero.css";

const ImageList = [
  {
    id: 1,
    img: Book1,
    title: "Artificial Intelligence & Generative AI for Beginners",
    author: "John",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Book2,
    title: "Sands of Eppla",
    author: "Janeal Falor",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Book3,
    title: "It Ends With Us",
    author: "Hoover Colleen",
    description:
      "Lost Boy, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Hero = ({ handleOrderPopup }) => {
  const [imageId, setImageId] = React.useState(Book1);
  const [title, setTitle] = React.useState("Artificial Intelligence & Generative AI");
  const [description, setDescription] = React.useState(
    "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  return (
    <>
      <div className="hero-section" style={bgImage}>
        <div className="hero-container">
          <div className="hero-grid">
            {/* text content section */}
            <div className="hero-text">
              <h1 className="hero-title">{title}</h1>
              <p className="hero-description">{description}</p>
              <div>
                <button onClick={handleOrderPopup} className="order-button">
                  Order Now
                </button>
              </div>
            </div>
            {/* Image section */}
            <div className="hero-image-section">
              <div className="hero-image-wrapper">
                <img src={imageId} alt="book" className="hero-main-image" />
              </div>
              <div className="hero-thumbnail-wrapper">
                {ImageList.map((item) => (
                  <img
                    key={item.id}
                    src={item.img}
                    onClick={() => {
                      setImageId(item.img);
                      setTitle(item.title);
                      setDescription(item.description);
                    }}
                    alt="thumbnail"
                    className="hero-thumbnail"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
