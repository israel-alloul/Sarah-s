// src/context/CartContext.js
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // פונקציה להוספת מוצר לסל
  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
    }
  };

  // פונקציה להסרת מוצר מהסל
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // פונקציה לעדכון הכמות של מוצר
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // מוודא שהכמות לא תהיה פחות מ-1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // פונקציה לניקוי הסל
//   const clearCart = () => {
//     setCartItems([]);
//   };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;