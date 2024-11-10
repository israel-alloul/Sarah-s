import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  
  const navigate = useNavigate();
  
  const handleContinueShopping = () => {
    navigate("/cakes"); // מחזיר לדף הקטגוריה כדי להמשיך בקניות
  };

  const handleCheckout = () => {
    navigate("/checkout"); // מעביר לדף התחברות/רישום
  };

  // פונקציה לחישוב סך הכל של כל הפריטים בסל
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>הסל שלך</h2>
      {cartItems.length === 0 ? (
        <p>הסל שלך ריק</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
              <div>
                <h3>{item.name}</h3>
                <p>מחיר יחידה: {item.price} ₪</p>
                <p>מחיר כולל: {item.price * item.quantity} ₪</p> {/* מחיר פריט כפול כמות */}
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>הסר</button>
              </div>
            </div>
          ))}
          <h3>סך הכל לסל: {calculateTotal()} ₪</h3> {/* הצגת הסך הכל */}
          <button onClick={handleContinueShopping}>המשך בקניות</button>
          <button onClick={handleCheckout}>המשך לתשלום</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
