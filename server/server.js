// server.js
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { authenticateToken } = require("./Middleware");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

// חיבור למסד הנתונים
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "db_sara",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

const appAdmin = require("./routes/admin");
app.use("/admin", appAdmin);

// יצירת JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, "1234", {
    expiresIn: "1h",
  });
};

// מסלול התחברות

// מסלול התחברות
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // בדיקה אם המשתמש קיים במסד
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      console.log("User not found");
      return res.status(400).send("User not found");
    }

    const user = results[0];

    // השוואת סיסמאות
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch); // בדיקת השוואת סיסמאות

      if (!isMatch) {
        console.log("Invalid credentials");
        return res.status(400).send("Invalid credentials");
      }

      // יצירת אסימון ושליחתו
      const token = generateToken(user);
      res.json({ token, role: user.role });
    } catch (error) {
      console.log("Error comparing password:", error);
      res.status(500).send("Server error");
    }
  });
});

// מסלול רישום
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password, phone } = req.body;

  // בדיקה אם המשתמש כבר קיים
  const checkUserQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(checkUserQuery, [email, username], async (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length > 0) {
      console.log("User already exists:", results);
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      // הצפנה של הסיסמה
      const hashedPassword = await bcrypt.hash(password, 10);

      // הכנסת המשתמש לטבלה
      const insertUserQuery =
        "INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)";
      db.query(
        insertUserQuery,
        [username, email, hashedPassword, phone],
        (err, result) => {
          if (err) {
            console.log("Error saving user:", err);
            return res.status(500).json({ message: "Error saving user" });
          }
          console.log("User registered successfully:", result);
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    } catch (error) {
      console.log("Error encrypting password:", error);
      res.status(500).json({ message: "Error encrypting password" });
    }
  });
});

//////////////////////////////////////////////////////////////////////////
app.get("/api/products", (req, res) => {
  const { type } = req.query; // קבלת type מהשאילתה
  

  // בדיקה אם יש ערך ל-type, אחרת שליפה של כל המוצרים
  let sql = "SELECT * FROM products";
  const params = [];

  if (type) {
    sql += " WHERE type = ?";
    params.push(type);
  }

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    console.log("Fetched products from database:", results); // בדיקה שהנתונים נשלפים מה-Database
    res.json(results);
  });
});

/////////////////////////
// מסלול ליצירת הזמנה
// app.post("/api/orders", authenticateToken, (req, res) => {
//   const userId = req.userId;
//   const {
//     cartItems,
//     totalPrice,
//     address,
//     isDelivery,
//     paymentMethod,
//     plannedDate,
//   } = req.body;
//   console.log("******", req.body);

//   console.log("Cart items:", cartItems);
//   console.log("paymentMethod:", paymentMethod);
//   console.log("isDelivery:", isDelivery);

//   if (!Array.isArray(cartItems) || cartItems.length === 0) {
//     return res.status(400).json({ message: "Invalid product details" });
//   }

//   const insertOrderQuery =
//     "INSERT INTO orders (user_id, total_price, address,order_date,planned_date) VALUES (?, ?, ?, NOW(), ?)";
//   // console.log("******",plannedDate);

//   db.query(
//     insertOrderQuery,
//     [userId, totalPrice, address, plannedDate || null],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting order:", err);
//         return res.status(500).json({ message: "Server error" });
//       }
//       res
//         .status(201)
//         .json({
//           message: "Order created successfully",
//           orderId: result.insertId,
//         });

//       const orderId = result.insertId;

//       const orderItemsQuery =
//         "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
//       const orderItems = cartItems.map((item) => [
//         orderId,
//         item.id,
//         item.quantity,
//         item.price,
//       ]);

//       db.query(orderItemsQuery, [orderItems], (err) => {
//         if (err) {
//           console.error("Error inserting order items:", err);
//           return res.status(500).json({ message: "Server error" });
//         }

//         // הוספת הרשומה לטבלת payments
//         // הוצא את method מתוך paymentMethod אם הוא אובייקט
//         const paymentMethodValue =
//           typeof paymentMethod === "object"
//             ? paymentMethod.method
//             : paymentMethod;

//         const insertPaymentQuery =
//           "INSERT INTO payments (order_id, user_id, payment_date, amount, payment_method, status) VALUES (?, ?, NOW(), ?, ?, ?)";
//         const paymentStatus =
//           paymentMethodValue === "כרטיס אשראי" ? "שולם" : "ממתין";

//         db.query(
//           insertPaymentQuery,
//           [orderId, userId, totalPrice, paymentMethodValue, paymentStatus],
//           (err) => {
//             if (err) {
//               console.error("Error inserting payment:", err);
//               return res.status(500).json({ message: "Server error" });
//             }

//             res
//               .status(201)
//               .json({ message: "Order and payment created successfully" });
//           }
//         );
//       });
//     }
//   );
// });

///////////////..........................................................,,,,,,,,,,,,,,,,,,,,,,,,,

app.post("/api/orders", authenticateToken, (req, res) => {
  const userId = req.userId;
  const { cartItems, totalPrice, address, isDelivery, paymentMethod, plannedDate } = req.body;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: "Invalid product details" });
  }

  const insertOrderQuery =
    "INSERT INTO orders (user_id, total_price, address, order_date, planned_date) VALUES (?, ?, ?, NOW(), ?)";
  db.query(insertOrderQuery, [userId, totalPrice, address, plannedDate || null], (err, result) => {
    if (err) {
      console.error("Error inserting order:", err);
      return res.status(500).json({ message: "Server error while creating order" });
    }

    const orderId = result.insertId;

    const orderItemsQuery =
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
    const orderItems = cartItems.map((item) => [
      orderId,
      item.id,
      item.quantity,
      item.price,
    ]);

    db.query(orderItemsQuery, [orderItems], (err) => {
      if (err) {
        console.error("Error inserting order items:", err);
        return res.status(500).json({ message: "Server error while adding order items" });
      }

      // טיפול בתשלום
      const paymentMethodValue =
        typeof paymentMethod === "object" ? paymentMethod.method : paymentMethod;

      const insertPaymentQuery =
        "INSERT INTO payments (order_id, user_id, payment_date, amount, payment_method, status) VALUES (?, ?, NOW(), ?, ?, ?)";
      const paymentStatus = paymentMethodValue === "כרטיס אשראי" ? "שולם" : "ממתין";

      db.query(
        insertPaymentQuery,
        [orderId, userId, totalPrice, paymentMethodValue, paymentStatus],
        (err) => {
          if (err) {
            console.error("Error inserting payment:", err);
            return res.status(500).json({ message: "Server error while processing payment" });
          }

          // תגובה סופית
          return res.status(201).json({
            message: "Order and payment created successfully",
            orderId,
          });
        }
      );
    });
  });
});



// שליחת מייל באמצעות טופס יצירת קשר
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  const mailOptions = {
      from: "ic7.alloul@gmail.com",
      to: "ic7.alloul@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };
  try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
  }
});












module.exports = db;
// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
