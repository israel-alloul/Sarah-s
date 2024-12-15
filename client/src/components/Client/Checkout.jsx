import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {

  
  const { cartItems } = useContext(CartContext);
  const [isDelivery, setIsDelivery] = useState(false);
  const [address, setAddress] = useState({
    city: "",
    street: "",
    houseNumber: "",
    floor: "",
    apartment: "",
    buildingCode: "",
    notes: ""
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [plannedDate, setPlannedDate] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setIsDelivery(selectedOption === "delivery");
    setDeliveryFee(selectedOption === "delivery" ? 20 : 0);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
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
          <h3>פרטי כתובת למשלוח</h3>
          <label>עיר:</label>
          <input type="text" name="city" value={address.city} onChange={handleAddressChange} />

          <label>רחוב:</label>
          <input type="text" name="street" value={address.street} onChange={handleAddressChange} />

          <label>מספר בית:</label>
          <input type="text" name="houseNumber" value={address.houseNumber} onChange={handleAddressChange} />

          <label>קומה:</label>
          <input type="text" name="floor" value={address.floor} onChange={handleAddressChange} />

          <label>דירה:</label>
          <input type="text" name="apartment" value={address.apartment} onChange={handleAddressChange} />

          <label>קוד לבניין:</label>
          <input type="text" name="buildingCode" value={address.buildingCode} onChange={handleAddressChange} />

          <label>הערות למשלוח:</label>
          <textarea name="notes" value={address.notes} onChange={handleAddressChange}></textarea>
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
