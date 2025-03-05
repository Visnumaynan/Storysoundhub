import React, { useState } from "react";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 6,
      img: Book2,
      title: "Machine Learning Mastery",
      rating: 4.3,
      author: "Tech Enthusiast",
      price: 2999,
    },
    {
      id: 7,
      img: Book3,
      title: "The Midnight Library",
      rating: 4.6,
      author: "Matt Haig",
      price: 1950,
    },
    {
      id: 8,
      img: Book1,
      title: "The Silent Patient",
      rating: 4.8,
      author: "Alex Michaelides",
      price: 1800,
    },
    {
      id: 9,
      img: Book2,
      title: "Educated: A Memoir",
      rating: 4.9,
      author: "Tara Westover",
      price: 2500,
    },
    {
      id: 10,
      img: Book3,
      title: "The Alchemist",
      rating: 5.0,
      author: "Paulo Coelho",
      price: 1000,
    },
  ]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0); // Simply sum the prices
  };

  return (
    <div className={styles["cart-container"]}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt={item.title} style={{ width: '50px' }} /> {/* Display image */}
                    {item.title}
                  </td>
                  <td>Rs.{item.price}</td>
                  <td>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: Rs.{getTotalPrice()}</h3>
        </>
        
      )}
    </div>
  );
};

export default CartPage;
