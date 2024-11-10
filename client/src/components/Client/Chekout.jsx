
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [isDelivery, setIsDelivery] = useState(false);
  const [address, setAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setIsDelivery(selectedOption === "delivery");
    setDeliveryFee(selectedOption === "delivery" ? 20 : 0);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleContinueToPayment = () => {
    // בדיקה אם המשתמש מחובר
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      // המשך לתשלום (פה ניתן להוסיף ניווט לעמוד התשלום בפועל)
      alert('ממשיכים לתשלום...');
      navigate("/payment", { state: { address, deliveryFee, cartItems, isDelivery } });
    } else {
      // ניתוב לעמוד ההתחברות
      navigate("/login");
    }
  };

  return (
    <div className="checkout">
      <h2>פרטי ההזמנה</h2>
      <div>
        <label>
          <input
            type="radio"
            value="pickup"
            checked={!isDelivery}
            onChange={handleOptionChange}
          />
          איסוף עצמי
        </label>
        <label>
          <input
            type="radio"
            value="delivery"
            checked={isDelivery}
            onChange={handleOptionChange}
          />
          משלוח (תוספת {deliveryFee} ₪)
        </label>
      </div>
      
      {isDelivery && (
        <div>
          <label>כתובת למשלוח:</label>
          <input type="text" value={address} onChange={handleAddressChange} />
        </div>
      )}
      
      <h3>סה"כ לתשלום: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryFee} ₪</h3>
      <button onClick={handleContinueToPayment}>המשך לתשלום</button>
    </div>
  );
};

export default Checkout;
