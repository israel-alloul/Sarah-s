import React, { useEffect, useState } from 'react';
import '../../assets/stylesManager/OrdersManagement.css';

const PaymentsManagement = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null); // state עבור מודאל
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    // קריאה לשרת לשליפת תשלומים
    fetch('http://localhost:5000/admin/payments')
      .then(response => response.json())
      .then(data => setPayments(data))
      .catch(error => console.error('Error fetching payments:', error));
  }, []);

  const handleStatusChange = (paymentId, newStatus) => {
    // שליחת בקשת עדכון לשרת
    fetch(`http://localhost:5000/admin/payments/${paymentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => {
        if (response.ok) {
          // עדכון הסטטוס ב-state המקומי
          setPayments(prevPayments =>
            prevPayments.map(payment =>
              payment.payment_id === paymentId ? { ...payment, status: newStatus } : payment
            )
          );
        } else {
          console.error('Error updating payment status');
        }
      })
      .catch(error => console.error('Error updating payment status:', error));
  };


  const handleShowDetails = (payment) => {
    setSelectedPayment(payment);
    setNotes(payment.notes || ''); // אתחול ההערות
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

    // פונקציה לעדכון הערות בשרת
    const handleSaveNotes = () => {
      if (!selectedPayment) return;
  
      fetch(`http://localhost:5000/admin/payments/${selectedPayment.payment_id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      })
        .then(response => {
          if (response.ok) {
            // עדכון ההערות ב-state המקומי
            setPayments(prevPayments =>
              prevPayments.map(payment =>
                payment.payment_id === selectedPayment.payment_id ? { ...payment, notes } : payment
              )
            );
            handleCloseModal(); // סגירת המודאל
            console.log("הערות עודכנו בהצלחה");
          } else {
            console.error('שגיאה בעדכון ההערות');
          }
        })
        .catch(error => console.error('שגיאה בעדכון ההערות:', error));
    };
  




  return (
    <div>
      <h1>ניהול תשלומים</h1>
      <table>
        <thead>
          <tr>
            <th>מספר תשלום</th>
            <th>שם המזמין</th>
            <th>מספר הזמנה</th>
            <th>סכום</th>
            <th>סטטוס</th>
            <th>תאריך תשלום</th>
            <th>סוג תשלום</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.customer_name}</td>
              <td>{payment.order_id}</td>
              <td>{payment.amount} ₪</td>
              {/* <td>{payment.status}</td> */}
               <td>
                <select
                  value={payment.status}
                  onChange={(e) => handleStatusChange(payment.payment_id, e.target.value)}
                >
                  <option value="ממתין">ממתין</option>
                  <option value="שולם">שולם</option>
                  <option value="בוטל">בוטל</option>
                </select>
              </td>
              
              <td>{payment.status === 'שולם' ? payment.payment_date : '—'}</td>
              <td>{payment.payment_method}</td>
              <td>
              <button onClick={() => handleShowDetails(payment)}>הצג פרטים</button>
                {payment.status !== 'שולם' && (
                  <button>אשר תשלום</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          {/* Modal */}
      {selectedPayment && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>פרטי תשלום</h2>
            <p>שם לקוח: {selectedPayment.customer_name}</p>
            <p>סוג תשלום: {selectedPayment.payment_method}</p>
            <label htmlFor="notes">הערות:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={handleNotesChange}
            />
             <button onClick={handleSaveNotes}>שמור שינויים</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentsManagement;
