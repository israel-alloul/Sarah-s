import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import styles from "../../assets/stylesManager/OrderDetails.module.css";

const OrderDetails = () => {
  const location = useLocation();

  const address = location.state?.address || "";
  
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    index: null,
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/admin/orders/${orderId}/details`)
      .then((response) => response.json())
      .then((data) => setOrderDetails(data))
      .catch((error) => console.error("Error fetching order details:", error));
  }, [orderId]);

  // פתיחת המודאל לעריכה
  const handleEdit = (index) => {
    const item = orderDetails.items[index];
    setSelectedItem({ index, quantity: item.quantity, price: item.price });
    setShowModal(true);
  };

  const parseAddress = (addressString) => {
    const addressParts = addressString.split(", ");
    const addressObj = {};

    addressParts.forEach((part) => {
      const [label, value] = part.split(": ");
      if (label && value) {
        addressObj[label] = value;
      }
    });

    return addressObj;
  };
  const parsedAddress = parseAddress(address || "");

  // שמירת השינויים וסגירת המודאל
  const handleSaveChanges = () => {
    const updatedItems = [...orderDetails.items];
    updatedItems[selectedItem.index].quantity = selectedItem.quantity;
    updatedItems[selectedItem.index].price = selectedItem.price;
    setOrderDetails({ ...orderDetails, items: updatedItems });

    // שמירת השינויים לשרת
    fetch(`http://localhost:5000/admin/orders/${orderId}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: updatedItems }),
    })
      .then((response) => {
        if (response.ok) {
          alert("ההזמנה עודכנה בהצלחה!");
        } else {
          alert("שגיאה בעדכון ההזמנה");
        }
      })
      .catch((error) => console.error("Error updating order:", error));

    setShowModal(false);
  };

  // מחיקת מוצר מהרשימה
  const handleDelete = (productId, index) => {
    // מחיקת המוצר מהדאטהבייס באמצעות fetch
    fetch(`http://localhost:5000/admin/orders/items/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // עדכון ה-state לאחר מחיקה מוצלחת מהדאטהבייס
          const updatedItems = orderDetails.items.filter((_, i) => i !== index);
          setOrderDetails({ ...orderDetails, items: updatedItems });
        } else {
          console.error("שגיאה במחיקת המוצר מהדאטהבייס");
        }
      })
      .catch((error) => console.error("שגיאה בבקשת המחיקה:", error));
  };

  // יצירת PDF
  const handlePrintPDF = () => {
    const element = document.getElementById("order-details");
    html2pdf().from(element).save(`Order_${orderDetails.order_id}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!orderDetails) {
    return <div>טוען פרטי הזמנה...</div>;
  }

  const isSelfPickup = address.includes("איסוף עצמי");

  return (
    <div className={styles.orderDetailsContainer}>
      <h2 className={styles.orderTitle}>פרטי הזמנה {orderDetails.order_id}</h2>
      <div id="order-details" className={styles.orderTableContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>שם מוצר</th>
              <th>כמות</th>
              <th>מחיר</th>
              <th>כתובת</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item, index) => (
              <tr key={item.order_item_id}>
                <td>{item.product_name}</td>
                <td>{item.quantity} </td>
                <td>{item.price} ₪</td>
                <td>
                  {/* אם הכתובת היא איסוף עצמי, לא נציג את פרטי הכתובת */}
                  {!isSelfPickup ? (
                    <table className={styles.addressTable}>
                      <tbody>
                        <tr>
                          <td><strong>עיר:</strong></td>
                          <td>{parsedAddress["עיר"]}</td>
                        </tr>
                        <tr>
                          <td><strong>רחוב:</strong></td>
                          <td>{parsedAddress["רחוב"]}</td>
                        </tr>
                        <tr>
                          <td><strong>מספר בית:</strong></td>
                          <td>{parsedAddress["מספר בית"]}</td>
                        </tr>
                        <tr>
                          <td><strong>קומה:</strong></td>
                          <td>{parsedAddress["קומה"]}</td>
                        </tr>
                        <tr>
                          <td><strong>דירה:</strong></td>
                          <td>{parsedAddress["דירה"]}</td>
                        </tr>
                        <tr>
                          <td><strong>קוד בניין:</strong></td>
                          <td>{parsedAddress["קוד בניין"]}</td>
                        </tr>
                        <tr>
                          <td><strong>הערות:</strong></td>
                          <td>{parsedAddress["הערות"]}</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <p>איסוף עצמי</p>
                  )}
                </td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEdit(index)}>ערוך</button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(item.product_id, index)}>מחק מוצר</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.printButton} onClick={handlePrintPDF}>ייצא ל-PDF</button>
        <button className={styles.printButton} onClick={handlePrint}>הדפסה</button>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>ערוך מוצר</h4>
            <label>
              כמות:
              <input
                type="number"
                value={selectedItem.quantity}
                onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
              />
            </label>
            <button className={styles.saveButton} onClick={handleSaveChanges}>שמור</button>
            <button className={styles.cancelButton} onClick={() => setShowModal(false)}>ביטול</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
