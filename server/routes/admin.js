const express = require("express");
const router = express.Router();
const db = require("../connection/db");


router.get("/", (req, res) => {
  res.send("I admin");
});

// מסלול לשליפת כל המוצרים
router.get("/products", (req, res) => {
  console.log("Request received at /api/products");
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: "Server error" });
    } else {
      console.log("Products fetched from database:", results);
      res.json(results);
    }
  });
});

// מסלול למחיקת מוצר
router.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    const query = "DELETE FROM products WHERE id = ?";
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ message: "Server error" });
      }
      console.log("Product deleted successfully");
      
      res.json({ message: "Product deleted successfully" });
    });
  });
  
  // מסלול לעדכון מוצר
  router.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;
    const query = "UPDATE products SET name = ?, price = ? WHERE id = ?";
    db.query(query, [name, price, productId], (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ message: "Server error" });
      }
      console.log("Product updated successfully");
      res.json({ message: "Product updated successfully" });
    });
  });
  
  
  // מסלול להוספת מוצר
  router.post('/products', (req, res) => {
    const { type, category, name, description, price, image } = req.body;
    const query = 'INSERT INTO products (type, category, name, description, price, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [type, category, name, description, price, image], (err, result) => {
      if (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Server error' });
      } else {
        console.log('Product added successfully');
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
      }
    });
  });


  


 
router.get('/users', async (req, res) => {
    try {
      // בקשה להבאת רשימת משתמשים עם ID, USERNAME ו-EMAIL בלבד
      const query = "SELECT id, username, email ,phone FROM users";
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching users:", err);
          res.status(500).json({ message: "Server error" });
        } else {
          console.log("Users fetched from database:", results);
          res.json(results);
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
})


// נתיב להצגת ההזמנות למנהל
router.get('/orders', async (req, res) => {
    try {
      const query = "SELECT * FROM orders";
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching products:", err);
          res.status(500).json({ message: "Server error" });
        } else {
          console.log("Products fetched from database:", results);
          res.json(results);
        }
      });
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });

// נתיב להצגת פרטי הזמנה מסוימת
router.get('/orders/:orderId/details', async (req, res) => {
    const { orderId } = req.params;
    try {
      const query = `
        SELECT 
          order_items.order_item_id,
          order_items.order_id,
          order_items.product_id,
          order_items.quantity,
          order_items.price,
          products.name AS product_name
        FROM 
          order_items
        JOIN 
          products ON order_items.product_id = products.id
        WHERE 
          order_items.order_id = ?
      `;
  
      db.query(query, [orderId], (err, results) => {
        if (err) {
          console.error("Error fetching order details:", err);
          res.status(500).json({ message: "Server error" });
        } else {
          res.json({ items: results, order_id: orderId });
        }
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ message: 'Error fetching order details' });
    }
  });
    
  // נתיב לעדכון סטטוס של הזמנה
router.put('/orders/:orderId/status', (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    const query = `
      UPDATE orders 
      SET status = ? 
      WHERE order_id = ?
    `;
  
    db.query(query, [status, orderId], (err, results) => {
      if (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ message: 'Error updating order status' });
      } else {
        res.status(200).json({ message: 'Order status updated successfully' });
      }
    });
  });

  // נתיב לעדכון פריטים של ההזמנה
  router.put('/orders/:orderId/update', (req, res) => {
    const { orderId } = req.params;
    const { items } = req.body;
  
    // דוגמה לביצוע עדכון עבור פרטי ההזמנה ב-Database
    items.forEach(item => {
      const sql = `UPDATE order_items SET quantity = ?, price = ? WHERE order_item_id = ? AND order_id = ?`;
      console.log('Updating order item:', item);
      db.query(sql, [item.quantity, item.price, item.order_item_id, orderId], (err, result) => {
        if (err) {
          console.error('Error updating order item:', err);
          res.status(500).json({ message: 'שגיאה בעדכון פריט בהזמנה.' });
          return;
        }
         console.log('Order item updated successfully:', result);
      });
    });
  
    res.status(200).json({ message: 'ההזמנה עודכנה בהצלחה.' });
  });
  
  

module.exports = router;
