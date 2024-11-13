import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/admin/orders')
      .then(response => response.json())
      .then(data => {
        console.log('Data received from server:', data);
        setOrders(data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/manager/orders/${orderId}/details`);
  };

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:5000/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        // עדכון הסטטוס בממשק המשתמש לאחר עדכון מוצלח בשרת
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.order_id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch(error => console.error('Error updating status:', error));
  };

  return (
    <div>
      <h1>ניהול הזמנות</h1>
      <table>
        <thead>
          <tr>
            <th>מספר הזמנה</th>
            <th>שם לקוח</th>
            <th>סכום כולל</th>
            <th>תאריך</th>
            <th>סטטוס</th>
            <th>פרטים</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.user_id}</td>
              <td>{order.total_price}</td>
              <td>{order.order_date}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                >
                  <option value="ממתין לטיפול">ממתין לטיפול</option>
                  <option value="בהכנה">בהכנה</option>
                  <option value="הושלם">הושלם</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleViewOrderDetails(order.order_id)}>
                  הצג פריטים
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersManagement;
