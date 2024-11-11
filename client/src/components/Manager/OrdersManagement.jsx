import React, { useEffect, useState } from 'react';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  


  useEffect(() => {
    fetch('http://localhost:5000/admin/orders')
      .then(response => response.json())
      .then(data => {
        console.log('Data received from server:', data); // הדפסת הנתונים המתקבלים
        setOrders(data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);
  
  return (
    <div>
      <h1>ניהול הזמנות</h1>
      <table>
        <thead>
          <tr>
            <th>מספר הזמנה</th>
            <th>שם לקוח</th>
            <th>סכום כולל</th>
            <th>פריטים</th>
          </tr>
        </thead>
        <tbody>
        <tbody>
  {orders && orders.map(order => (
    <tr key={order.order_id}>
      <td>{order.order_id}</td>
      <td>{order.user_id}</td>
      <td>{order.address}</td>
      <td>{order.order_date}</td>
      <td>{order.total_price}</td>    
    </tr>
  ))}
</tbody>

        </tbody>
      </table>
    </div>
  );
};

export default OrdersManagement;
