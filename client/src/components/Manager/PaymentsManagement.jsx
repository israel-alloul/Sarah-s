import React, { useEffect, useState } from "react";
import "../../assets/stylesManager/OrdersManagement.css";

const PaymentsManagement = () => {
  const [payments, setPayments] = useState([]);

  const [searchTerm, setSearchTerm] = useState(""); // הוספת state עבור החיפוש
  const [filteredPayments, setFilteredPayments] = useState([]);

  const [statusFilter, setStatusFilter] = useState(""); // לסינון לפי סטטוס תשלום
  const [dateFilter, setDateFilter] = useState(""); // לסינון לפי תאריך
  const [paymentMethodFilter, setPaymentMethodFilter] = useState(""); // לסינון לפי אמצעי תשלום

  const [selectedPayment, setSelectedPayment] = useState(null); // state עבור מודאל
  const [notes, setNotes] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");

  useEffect(() => {
    // קריאה לשרת לשליפת תשלומים
    fetch("http://localhost:5000/admin/payments")
      .then((response) => response.json())
      .then((data) => {
        setPayments(data);
        setFilteredPayments(data);
        console.log("Fetched payments:", data);
      })
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  // לסינון
  useEffect(() => {
    console.log("Starting filter process with:", {
      statusFilter,
      dateFilter,
      paymentMethodFilter,
      payments,
    });

    const filteredResults = payments.filter((payment) => {
      const matchesStatus =
        statusFilter === "" || payment.status === statusFilter;
      const matchesDate =
        dateFilter === "" || payment.payment_date.startsWith(dateFilter);
      const matchesPaymentMethod =
        paymentMethodFilter === "" ||
        payment.payment_method === paymentMethodFilter;
      return matchesStatus && matchesDate && matchesPaymentMethod;
    });
    setFilteredPayments(filteredResults);
  }, [statusFilter, dateFilter, paymentMethodFilter, payments]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = payments.filter(
      (payment) =>
        payment.customer_name.toLowerCase().includes(term) ||
        payment.order_id.toString().includes(term)
    );
    setFilteredPayments(filtered);
  };

  const handleStatusChange = (paymentId, newStatus) => {
    // שליחת בקשת עדכון לשרת
    fetch(`http://localhost:5000/admin/payments/${paymentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.ok) {
          // עדכון הסטטוס ב-state המקומי
          setPayments((prevPayments) =>
            prevPayments.map((payment) =>
              payment.payment_id === paymentId
                ? { ...payment, status: newStatus }
                : payment
            )
          );
        } else {
          console.error("Error updating payment status");
        }
      })
      .catch((error) => console.error("Error updating payment status:", error));
  };

  const handleShowDetails = (payment) => {
    console.log(payment);

    setSelectedPayment(payment);
    setNotes(payment.notes || "");
    setReceiptNumber(payment.receipt_number || "");
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleReceiptNumberChange = (e) => {
    setReceiptNumber(e.target.value);
  };

  // פונקציה לעדכון הערות בשרת
  const handleSaveNotes = () => {
    // if (!selectedPayment) return;
    console.log(selectedPayment);

    fetch(
      `http://localhost:5000/admin/payments/${selectedPayment.payment_id}/notes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes,
          receipt_number: receiptNumber,
          payment_date: selectedPayment.payment_date,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("העדכון נשמר בהצלחה במסד הנתונים");
          // עדכון ההערות ב-state המקומי
          setPayments((prevPayments) =>
            prevPayments.map((payment) =>
              payment.payment_id === selectedPayment.payment_id
                ? {
                    ...payment,
                    notes,
                    receipt_number: receiptNumber,
                    payment_date: selectedPayment.payment_date,
                  }
                : payment
            )
          );
          handleCloseModal(); // סגירת המודאל
          console.log("הערות עודכנו בהצלחה");
        } else {
          console.error("שגיאה בעדכון ההערות");
        }
      })
      .catch((error) => console.error("שגיאה בעדכון ההערות:", error));
  };

  const handleSendReminder = (paymentId) => {
    fetch("http://localhost:5000/admin/send-reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentId }),
    })
      .then((response) => {
        if (response.ok) {
          alert("תזכורת נשלחה בהצלחה!");
        } else {
          alert("שגיאה בשליחת תזכורת.");
        }
      })
      .catch((error) => console.error("Error sending reminder:", error));
  };
  

  return (
    <div>
      <h1>ניהול תשלומים</h1>
      <div>
        {/* הצגת פילטר */}
        <label>סטטוס תשלום:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">הצג הכל</option>
          <option value="שולם">שולם</option>
          <option value="ממתין">ממתין</option>
          <option value="בוטל">בוטל</option>
        </select>

        <label>תאריך:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <label>אמצעי תשלום:</label>
        <select
          value={paymentMethodFilter}
          onChange={(e) => setPaymentMethodFilter(e.target.value)}
        >
          <option value="">הצג הכל</option>
          <option value="מזומן">מזומן</option>
          <option value="שיק">צ'ק</option>
        </select>
      </div>

      {/* שדה חיפוש */}
      <input
        type="text"
        placeholder="חפש לפי שם לקוח או מספר הזמנה"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>מספר תשלום</th>
             <th>מספר לקוח</th>
            <th>שם לקוח</th>
           
            <th>מספר הזמנה</th>
            <th>סכום</th>
            <th>סטטוס</th>
            <th>תאריך תשלום</th>
            <th>סוג תשלום</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.user_id}</td>
              <td>{payment.customer_name}</td>
              
              <td>{payment.order_id}</td>
              <td>{payment.amount} ₪</td>

              <td>
                <select
                  value={payment.status}
                  onChange={(e) =>
                    handleStatusChange(payment.payment_id, e.target.value)
                  }
                >
                  <option value="ממתין">ממתין</option>
                  <option value="שולם">שולם</option>
                  <option value="בוטל">בוטל</option>
                </select>
              </td>

              <td>
                {payment.status === "שולם"
                  ? formatDate(payment.payment_date)
                  : "—"}
              </td>
              <td>{payment.payment_method}</td>
              <td>
                <button onClick={() => handleShowDetails(payment)}>
                  הצג פרטים
                </button>
                {/* {payment.status !== "שולם" && <button>אשר תשלום</button>} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedPayment && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>פרטי תשלום</h2>
            <p>שם לקוח: {selectedPayment.customer_name}</p>
            <p>סוג תשלום: {selectedPayment.payment_method}</p>

            {selectedPayment.status !== "שולם" && (
              <div>
                <label htmlFor="paymentDate">תאריך תשלום:</label>
                <input
                  id="paymentDate"
                  type="date"
                  value={selectedPayment.payment_date || ""}
                  onChange={(e) => {
                    console.log(e.target.value);

                    setSelectedPayment({
                      ...selectedPayment,
                      payment_date: `${e.target.value} 00:00:00`,
                    });
                  }}
                />
              </div>
            )}

            <label htmlFor="notes">הערות:</label>
            <textarea id="notes" value={notes} onChange={handleNotesChange} />
            <label htmlFor="receiptNumber">מספר קבלה:</label>
            <input
              id="receiptNumber"
              type="text"
              value={receiptNumber}
              onChange={handleReceiptNumberChange}
            />
            <button onClick={handleSaveNotes}>שמור שינויים</button>
            <td>
            <button onClick={() => handleSendReminder(selectedPayment.payment_id)}>
             שלח תזכורת
            </button>
          </td>

          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsManagement;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};
