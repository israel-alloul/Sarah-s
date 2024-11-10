import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, address, deliveryFee, isDelivery } = location.state || {};
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryFee;

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const createOrder = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert("אנא התחבר תחילה.");
      navigate("/login");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          cartItems,
          address: isDelivery ? address : 'איסוף עצמי',
          totalPrice,
          isDelivery,
          paymentMethod: {
            cardName,
            cardNumber,
            expiryDate,
            cvv
          }
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('הזמנה נוצרה בהצלחה!');
        navigate('/');
      } else {
        alert(`שגיאה: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert('שגיאה ביצירת ההזמנה.');
    }
  };

  const handlePayment = () => {
    createOrder();
  };

  return (
    <div>
      <h2>תשלום</h2>
      {address && <p>כתובת למשלוח: {address}</p>}

      <h3>פרטי כרטיס אשראי</h3>
      <div>
        <label>שם בעל הכרטיס:</label>
        <input type="text" value={cardName} onChange={handleInputChange(setCardName)} placeholder="הכנס את שם בעל הכרטיס" />
      </div>
      <div>
        <label>מספר כרטיס:</label>
        <input type="text" value={cardNumber} onChange={handleInputChange(setCardNumber)} placeholder="הכנס את מספר הכרטיס" maxLength="16" />
      </div>
      <div>
        <label>תאריך תפוגה:</label>
        <input type="text" value={expiryDate} onChange={handleInputChange(setExpiryDate)} placeholder="MM/YY" maxLength="5" />
      </div>
      <div>
        <label>CVV:</label>
        <input type="text" value={cvv} onChange={handleInputChange(setCvv)} placeholder="CVV" maxLength="3" />
      </div>

      <button onClick={handlePayment}>בצע תשלום</button>
    </div>
  );
};

export default Payment;

