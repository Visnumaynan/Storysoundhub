import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Cart</h1>
        <span className={styles.itemCount}>{cart.length} items</span>
      </div>

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any books to your cart yet.</p>
          <button className={styles.continueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p className={styles.author}>by {item.author}</p>
                  <div className={styles.rating}>
                    {'★'.repeat(Math.floor(item.rating))}
                    {item.rating % 1 >= 0.5 ? '½' : ''}
                    {'☆'.repeat(5 - Math.ceil(item.rating))}
                    <span>{item.rating}</span>
                  </div>
                </div>
                <div className={styles.itemPrice}>
                  <span>Rs.{item.price.toLocaleString()}</span>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.removeButton} onClick={() => removeItem(item.id)}>
                    <span className={styles.removeIcon}>×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryItem}>
              <span>Subtotal</span>
              <span>Rs.{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Tax</span>
              <span>Rs.{Math.round(getTotalPrice() * 0.05).toLocaleString()}</span>
            </div>
            <div className={`${styles.summaryItem} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>Rs.{(getTotalPrice() + Math.round(getTotalPrice() * 0.05)).toLocaleString()}</span>
            </div>
            <button 
              className={styles.continueShoppingBtn} 
              onClick={() => navigate("/shop")} // Navigate on button click
            >
              Continue Shopping
            </button>
            </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;