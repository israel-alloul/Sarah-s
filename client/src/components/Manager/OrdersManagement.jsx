import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/stylesManager/OrdersManagement.css';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    address: "",
    delivery_date: "",
    delivery_time: ""
  });
  const navigate = useNavigate();

  // שליפת ההזמנות מהשרת
  useEffect(() => {
    fetch("http://localhost:5000/admin/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);


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
  
  const handleViewOrderDetails = (orderId) => {
    navigate(`/manager/orders/${orderId}/details`);
  };

  const handleViewDeliveryDetails = (order) => {
    setSelectedOrder(order);
    setEditData({
      address: order.address || "",
      delivery_date: order.delivery_date || "",
      delivery_time: order.delivery_time || ""
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveChanges = () => {
    // if (!selectedOrder) return;
    console.log(selectedOrder);
    


    const dateObject = new Date(editData.delivery_date);
    const formattedDate = dateObject.toISOString().split('T')[0];


    const updatedOrder = {
      ...selectedOrder,
      address: editData.address,
      delivery_date: formattedDate,
      delivery_time: editData.delivery_time
    };

    fetch(`http://localhost:5000/admin/orders/${selectedOrder.order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update order");
        }
        // Update orders list locally
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === selectedOrder.order_id ? updatedOrder : order
          )
        );
        closeModal();
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  const fetchPickupOrders = (address) => {
    fetch(`http://localhost:5000/admin/orders/pickup-next-week${address ? `?address=${address}` : ''}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Filtered orders:", data);
        setFilteredOrders(data);
      })
      .catch((error) => console.error("Error fetching filtered orders:", error));
  };
  
  const fetchAllOrders = () => {
    fetch("http://localhost:5000/admin/orders")
      .then((response) => response.json())
      .then((data) => setFilteredOrders(data))
      .catch((error) => console.error("Error fetching all orders:", error));
  };
  

  return (
    <div>
      <h1>ניהול הזמנות</h1>
      <button onClick={() => fetchPickupOrders("איסוף עצמי")}>הזמנות לאיסוף עצמי</button>
      <button onClick={() => fetchPickupOrders("משלוח")}>הזמנות משלוח</button>
      <button onClick={fetchAllOrders}>נקה הכל</button>



      <table>
        <thead>
          <tr>
            <th>מספר הזמנה</th>
            <th>שם לקוח</th>
            <th>מספר משתמש</th>
            <th>סכום כולל</th>
            <th>הזמנה תאריך</th>
            <th>סטטוס</th>
            <th>סוג משלוח</th>
            <th>פרטים</th>
          </tr>
        </thead>
        <tbody>
          
          {(filteredOrders.length > 0 ? filteredOrders : orders).map((order) => (

            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_name}</td> 
              <td>{order.user_id}</td>
              <td>{order.total_price} ₪</td>
              <td>{formatDate(order.planned_date || order.order_date)}</td>
              {/* <td>{formatDate(order.delivery_date)} {order.delivery_time}</td> */}
              {/* <td>{order.status}</td> */}
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
          
              <td>{order.address === "איסוף עצמי" ? "איסוף עצמי" : "משלוח"}</td>
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
            <div>
              <label>כתובת משלוח:</label>
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleInputChange}
              />
           <p>{selectedOrder.address}</p>
            </div>
            <div>
              <label>תאריך משלוח / איסוף:</label>
              <input
                type="date"
                name="delivery_date"
                value={editData.delivery_date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>שעת משלוח / איסוף:</label>
              <input
                type="time"
                name="delivery_time"
                value={editData.delivery_time}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSaveChanges}>שמור שינויים</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};
