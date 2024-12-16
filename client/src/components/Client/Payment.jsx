import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../assets/stylesClient/Payment.module.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, address, deliveryFee, isDelivery, plannedDate } =
    location.state || {};
  console.log("cartItems:", cartItems);
  const newAddress = `עיר: ${address.city}, רחוב: ${address.street}, מספר בית: ${address.houseNumber}, קומה: ${address.floor}, דירה: ${address.apartment}, קוד בניין: ${address.buildingCode}, הערות: ${address.notes}`;

  const totalPrice =
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
    deliveryFee;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const createOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("אנא התחבר תחילה.");
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems,
          address: isDelivery ? newAddress : "איסוף עצמי",
          totalPrice,
          isDelivery,
          paymentMethod: {
            method: paymentMethod,
            details:
              paymentMethod === "Credit Card"
                ? { cardName, cardNumber, expiryDate, cvv }
                : {},
          },
          plannedDate: plannedDate,
          userId: localStorage.getItem("userId"),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("הזמנה נוצרה בהצלחה!");
        navigate("/");
      } else {
        alert(`שגיאה: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("שגיאה ביצירת ההזמנה.");
    }
  };

  const handlePayment = () => {
    createOrder();
  };

  return (
    <div className={styles.paymentContainer}>
      <h2>תשלום</h2>
      {isDelivery && (
        <div className={styles.addressDetails}>
          <p>עיר: {address.city}</p>
          <p>רחוב: {address.street}</p>
          <p>מספר בית: {address.houseNumber}</p>
          <p>קומה: {address.floor}</p>
          <p>דירה: {address.apartment}</p>
          <p>קוד לבניין: {address.buildingCode}</p>
          <p>הערות: {address.notes}</p>
        </div>
      )}

      <h3>בחר אמצעי תשלום</h3>
      <div className={styles.selectPayment}>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">בחר אמצעי תשלום</option>
          <option value="Credit Card">כרטיס אשראי</option>
          <option value="מזומן">מזומן</option>
          <option value="שיק">שיק</option>
          <option value="העברה בנקאית">העברה בנקאית</option>
        </select>
      </div>

      {paymentMethod === "Credit Card" && (
        <div className={styles.creditCardDetails}>
          <label>שם בעל הכרטיס:</label>
          <input
            type="text"
            value={cardName}
            onChange={handleInputChange(setCardName)}
            className={styles.input}
            placeholder="הכנס את שם בעל הכרטיס"
          />
          <label>מספר כרטיס:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleInputChange(setCardNumber)}
            className={styles.input}
            placeholder="הכנס את מספר הכרטיס"
            maxLength="16"
          />
          <label>תאריך תפוגה:</label>
          <input
            type="text"
            value={expiryDate}
            onChange={handleInputChange(setExpiryDate)}
            className={styles.input}
            placeholder="MM/YY"
            maxLength="5"
          />
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={handleInputChange(setCvv)}
            className={styles.input}
            placeholder="CVV"
            maxLength="3"
          />
        </div>
      )}

      {paymentMethod === "מזומן" && (
        <div className={styles.infoMessage}>
          <p>תשלום במזומן יתבצע במועד האספקה.</p>
        </div>
      )}

      {paymentMethod === "שיק" && (
        <div className={styles.infoMessage}>
          <p>פרטי שיק יינתנו לאחר השלמת ההזמנה.</p>
        </div>
      )}

      {paymentMethod === "העברה בנקאית" && (
        <div className={styles.infoMessage}>
          <p>פרטי העברה בנקאית יינתנו לאחר השלמת ההזמנה.</p>
        </div>
      )}

      <button onClick={handlePayment} className={styles.paymentButton}>
        בצע תשלום
      </button>
    </div>
  );
};

export default Payment;
