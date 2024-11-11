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
  

module.exports = router;
