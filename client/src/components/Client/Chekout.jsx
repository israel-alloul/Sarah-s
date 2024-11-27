import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [isDelivery, setIsDelivery] = useState(false);
  const [address, setAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [plannedDate, setPlannedDate] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setIsDelivery(selectedOption === "delivery");
    setDeliveryFee(selectedOption === "delivery" ? 20 : 0);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDateChange = (e) => {
    setPlannedDate(e.target.value);
  };

  const handleContinueToPayment = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!plannedDate) {
      alert("אנא בחר תאריך להזמנה");
      return;
    }

    const selectedDate = new Date(plannedDate);
    const today = new Date();
    if (selectedDate < today) {
      alert("התאריך שנבחר לא יכול להיות בעבר");
      return;
    }

    if (isLoggedIn) {
      navigate("/payment", { 
        state: { address, deliveryFee, cartItems, isDelivery, plannedDate } 
      });
    } else {
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

      <div>
        <label>בחר תאריך להזמנה:</label>
        <input type="date" value={plannedDate} onChange={handleDateChange} />
      </div>
      
      <h3>סה"כ לתשלום: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryFee} ₪</h3>
      <button onClick={handleContinueToPayment}>המשך לתשלום</button>
    </div>
  );
};

export default Checkout;
