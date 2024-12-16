import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import styles from "../../assets/stylesClient/Checkout.module.css";

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
    setDeliveryFee(selectedOption === "delivery" ? 50 : 0);
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
    <div className={styles.checkout}>
      <h2>פרטי ההזמנה</h2>
      <div className={styles.deliveryOptions}>
        <label>
          <input
            type="radio"
            value="pickup"
            checked={!isDelivery}
            onChange={handleOptionChange}
            className={styles.input}
          />
          איסוף עצמי
        </label>
        <label>
          <input
            type="radio"
            value="delivery"
            checked={isDelivery}
            onChange={handleOptionChange}
            className={styles.input}
          />
          משלוח (תוספת {deliveryFee} ₪)
        </label>
      </div>

      {isDelivery && (
        <div>
          <h3>פרטי כתובת למשלוח</h3>
          <label>עיר:</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            className={styles.input}
          />

          <label>רחוב:</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            className={styles.input}
          />

          <label>מספר בית:</label>
          <input
            type="text"
            name="houseNumber"
            value={address.houseNumber}
            onChange={handleAddressChange}
            className={styles.input}
          />

          <label>קומה:</label>
          <input
            type="text"
            name="floor"
            value={address.floor}
            onChange={handleAddressChange}
            className={styles.input}
          />

          <label>דירה:</label>
          <input
            type="text"
            name="apartment"
            value={address.apartment}
            onChange={handleAddressChange}
            className={styles.input}
          />

          <label>קוד לבניין:</label>
          <input
            type="text"
            name="buildingCode"
            value={address.buildingCode}
            onChange={handleAddressChange}
            className={styles.input}
          />

          <label>הערות למשלוח:</label>
          <textarea
            name="notes"
            value={address.notes}
            onChange={handleAddressChange}
            className={styles.textarea}
          ></textarea>
        </div>
      )}

      <div>
        <label>בחר תאריך להזמנה:</label>
        <input
          type="date"
          value={plannedDate}
          onChange={handleDateChange}
          className={styles.input}
        />
      </div>

      <h3 className={styles.total}>
        סה"כ לתשלום:{" "}
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + deliveryFee}{" "}
        ₪
      </h3>
      <button onClick={handleContinueToPayment} className={styles.button}>
        המשך לתשלום
      </button>
    </div>
  );
};

export default Checkout;
