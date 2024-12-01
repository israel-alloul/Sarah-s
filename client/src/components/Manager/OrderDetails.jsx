// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [orderDetails, setOrderDetails] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/admin/orders/${orderId}/details`)
//       .then(response => response.json())
//       .then(data => setOrderDetails(data))
//       .catch(error => console.error('Error fetching order details:', error));
//   }, [orderId]);

//   // פונקציה לעדכון פרטי פריט
//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...orderDetails.items];
//     updatedItems[index][field] = value;
//     setOrderDetails({ ...orderDetails, items: updatedItems });
//   };

//   // פונקציה לשמירת השינויים בשרת
//   const saveChanges = () => {
//     fetch(`http://localhost:5000/admin/orders/${orderId}/update`, {
//       method: 'PUT',  // עדכון דרך PUT ולא POST
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(orderDetails),
//     })
//       .then(response => {
//         if (response.ok) {
//           alert('ההזמנה עודכנה בהצלחה!');
//         } else {
//           alert('שגיאה בעדכון ההזמנה');
//         }
//       })
//       .catch(error => console.error('Error updating order:', error));
//   };

//   if (!orderDetails) {
//     return <div>טוען פרטי הזמנה...</div>;
//   }

//   return (
//     <div>
//       <h2>פרטי הזמנה {orderDetails.order_id}</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>שם מוצר</th>
//             <th>כמות</th>
//             <th>מחיר</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.items.map((item, index) => (
//             <tr key={item.order_item_id}>
//               <td>{item.product_name}</td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.price}
//                   onChange={(e) => handleItemChange(index, 'price', e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={saveChanges}>שמור שינויים</button>
//     </div>
//   );
// };

// export default OrderDetails;






































// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';

// const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState({ index: null, quantity: 0, price: 0 });

//   useEffect(() => {
//     fetch(`http://localhost:5000/admin/orders/${orderId}/details`)
//       .then((response) => response.json())
//       .then((data) => setOrderDetails(data))
//       .catch((error) => console.error('Error fetching order details:', error));
//   }, [orderId]);

//   // פתיחת המודאל לעריכה
//   const handleEdit = (index) => {
//     const item = orderDetails.items[index];
//     setSelectedItem({ index, quantity: item.quantity, price: item.price });
//     setShowModal(true);
//   };

//   // סגירת המודאל ושמירת השינויים
//   const handleSaveChanges = () => {
//     const updatedItems = [...orderDetails.items];
//     updatedItems[selectedItem.index].quantity = selectedItem.quantity;
//     updatedItems[selectedItem.index].price = selectedItem.price;
//     setOrderDetails({ ...orderDetails, items: updatedItems });
//     setShowModal(false);
//   };

//   // מחיקת מוצר מהרשימה
//   const handleDelete = (index) => {
//     const updatedItems = orderDetails.items.filter((_, i) => i !== index);
//     setOrderDetails({ ...orderDetails, items: updatedItems });
//   };

//   // שמירת שינויים בשרת
//   const saveChangesToServer = () => {
//     fetch(`http://localhost:5000/admin/orders/${orderId}/update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(orderDetails),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert('ההזמנה עודכנה בהצלחה!');
//         } else {
//           alert('שגיאה בעדכון ההזמנה');
//         }
//       })
//       .catch((error) => console.error('Error updating order:', error));
//   };

//   // יצירת PDF
//   const handlePrintPDF = () => {
//     const element = document.getElementById('order-details');
//     html2pdf().from(element).save(`Order_${orderDetails.order_id}.pdf`);
//   };

// const handlePrint = () => {
//   window.print();
// }
//   if (!orderDetails) {
//     return <div>טוען פרטי הזמנה...</div>;
//   }

//   return (
//     <div>
//       <h2>פרטי הזמנה {orderDetails.order_id}</h2>
//       <div id="order-details">
//         <table>
//           <thead>
//             <tr>
//               <th>שם מוצר</th>
//               <th>כמות</th>
//               <th>מחיר</th>
//               <th>פעולות</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderDetails.items.map((item, index) => (
//               <tr key={item.order_item_id}>
//                 <td>{item.product_name}</td>
//                 <td>{item.quantity}</td>
//                 <td>{item.price}</td>
//                 <td>
//                   <button onClick={() => handleEdit(index)}>ערוך</button>
//                   <button onClick={() => handleDelete(index)}>מחק</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button onClick={saveChangesToServer}>שמור שינויים</button>
//       <button onClick={handlePrintPDF}>ייצא ל-PDF</button>
//       <button onClick={handlePrint}>הדפסה</button>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h4>ערוך מוצר</h4>
//             <label>
//               כמות:
//               <input
//                 type="number"
//                 value={selectedItem.quantity}
//                 onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
//               />
//             </label>
//             <label>
//               מחיר:
//               <input
//                 type="number"
//                 value={selectedItem.price}
//                 onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
//               />
//             </label>
//             <button onClick={handleSaveChanges}>שמור</button>
//             <button onClick={() => setShowModal(false)}>ביטול</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ index: null, quantity: 0, price: 0 });

  useEffect(() => {
    fetch(`http://localhost:5000/admin/orders/${orderId}/details`)
      .then((response) => response.json())
      .then((data) => setOrderDetails(data))
      .catch((error) => console.error('Error fetching order details:', error));
  }, [orderId]);

  // פתיחת המודאל לעריכה
  const handleEdit = (index) => {
    const item = orderDetails.items[index];
    setSelectedItem({ index, quantity: item.quantity, price: item.price });
    setShowModal(true);
  };

  // שמירת השינויים וסגירת המודאל
  const handleSaveChanges = () => {
    const updatedItems = [...orderDetails.items];
    updatedItems[selectedItem.index].quantity = selectedItem.quantity;
    updatedItems[selectedItem.index].price = selectedItem.price;
    setOrderDetails({ ...orderDetails, items: updatedItems });

    // שמירת השינויים לשרת
    fetch(`http://localhost:5000/admin/orders/${orderId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: updatedItems }),
    })
      .then((response) => {
        if (response.ok) {
          alert('ההזמנה עודכנה בהצלחה!');
        } else {
          alert('שגיאה בעדכון ההזמנה');
        }
      })
      .catch((error) => console.error('Error updating order:', error));

    setShowModal(false);
  };

  // מחיקת מוצר מהרשימה
  const handleDelete = (productId, index) => {
    // מחיקת המוצר מהדאטהבייס באמצעות fetch
    fetch(`http://localhost:5000/admin/orders/items/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // עדכון ה-state לאחר מחיקה מוצלחת מהדאטהבייס
          const updatedItems = orderDetails.items.filter((_, i) => i !== index);
          setOrderDetails({ ...orderDetails, items: updatedItems });
        } else {
          console.error('שגיאה במחיקת המוצר מהדאטהבייס');
        }
      })
      .catch((error) => console.error('שגיאה בבקשת המחיקה:', error));
  };
  




  // יצירת PDF
  const handlePrintPDF = () => {
    const element = document.getElementById('order-details');
    html2pdf().from(element).save(`Order_${orderDetails.order_id}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!orderDetails) {
    return <div>טוען פרטי הזמנה...</div>;
  }

  return (
    <div>
      <h2>פרטי הזמנה {orderDetails.order_id}</h2>
      <div id="order-details">
        <table>
          <thead>
            <tr>
              <th>שם מוצר</th>
              <th>כמות</th>
              <th>מחיר</th>
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
                  <button onClick={() => handleEdit(index)}>ערוך</button>
                  <button onClick={() => handleDelete(item.product_id, index)}>מחק מוצר</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handlePrintPDF}>ייצא ל-PDF</button>
      <button onClick={handlePrint}>הדפסה</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>ערוך מוצר</h4>
            <label>
              כמות:
              <input
                type="number"
                value={selectedItem.quantity}
                onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
              />
            </label>
            {/* <label>
              מחיר:
              <input
                type="number"
                value={selectedItem.price}
                onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
              />
            </label> */}
            <button onClick={handleSaveChanges}>שמור</button>
            <button onClick={() => setShowModal(false)}>ביטול</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
