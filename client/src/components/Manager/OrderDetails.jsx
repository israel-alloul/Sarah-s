import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/admin/orders/${orderId}/details`)
      .then(response => response.json())
      .then(data => setOrderDetails(data))
      .catch(error => console.error('Error fetching order details:', error));
  }, [orderId]);

  // פונקציה לעדכון פרטי פריט
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderDetails.items];
    updatedItems[index][field] = value;
    setOrderDetails({ ...orderDetails, items: updatedItems });
  };

  // פונקציה לשמירת השינויים בשרת
  const saveChanges = () => {
    fetch(`http://localhost:5000/admin/orders/${orderId}/update`, {
      method: 'PUT',  // עדכון דרך PUT ולא POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then(response => {
        if (response.ok) {
          alert('ההזמנה עודכנה בהצלחה!');
        } else {
          alert('שגיאה בעדכון ההזמנה');
        }
      })
      .catch(error => console.error('Error updating order:', error));
  };

  if (!orderDetails) {
    return <div>טוען פרטי הזמנה...</div>;
  }

  return (
    <div>
      <h2>פרטי הזמנה {orderDetails.order_id}</h2>
      <table>
        <thead>
          <tr>
            <th>שם מוצר</th>
            <th>כמות</th>
            <th>מחיר</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.items.map((item, index) => (
            <tr key={item.order_item_id}>
              <td>{item.product_name}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveChanges}>שמור שינויים</button>
    </div>
  );
};

export default OrderDetails;
