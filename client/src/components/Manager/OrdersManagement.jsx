import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/stylesManager/OrdersManagement.css';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // שליפת ההזמנות מהשרת
  useEffect(() => {
    fetch("http://localhost:5000/admin/orders")
      .then((response) => {
        console.log("Response from server:", response); // לוג לבדיקה
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received from server:", data); // לוג לבדיקה
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/manager/orders/${orderId}/details`);
  };

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:5000/admin/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const handleViewDeliveryDetails = (order) => {
    console.log("Viewing delivery details for order:", order);
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
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
            <th>סוג משלוח</th>
            <th>פרטים</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.user_id}</td>
              <td>{order.total_price} ₪</td>
              <td>{order.order_date}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.order_id, e.target.value)
                  }
                >
                  <option value="ממתין לטיפול">ממתין לטיפול</option>
                  <option value="בהכנה">בהכנה</option>
                  <option value="הושלם">הושלם</option>
                </select>
              </td>
              <td>{order.address==="איסוף עצמי"?"איסוף עצמי":"משלוח"}</td>
              <td>
                <button onClick={() => handleViewOrderDetails(order.order_id)}>
                  הצג פריטים
                </button>
                <button onClick={() => handleViewDeliveryDetails(order)}>
                  פרטי משלוח/איסוף
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>פרטי משלוח / איסוף עצמי</h2>
            {selectedOrder.address !== "איסוף עצמי" ? (
              <div>
                <p>כתובת משלוח: {selectedOrder.address}</p>
              </div>
            ) : (
              <div>
                <p>איסוף עצמי</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
