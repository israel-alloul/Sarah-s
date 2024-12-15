import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/stylesManager/ProductsManagement.module.css";

function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState({
    id: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/admin/products", {
      method: "GET",
      headers: {
        athorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // if (!data.succeed) {
        //   alert(data.message);
        //   return;
        // }
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/admin/products/${productId}`, {
      method: "DELETE",
    })
      .then(() =>
        setProducts(products.filter((product) => product.id !== productId))
      )
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowModal(true); // פותח את המודל
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost:5000/admin/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct),
    })
      .then(() => {
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? editingProduct : product
          )
        );
        setShowModal(false); // סוגר את המודל לאחר שמירה
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ניהול מוצרים</h1>
      <Link to="/manager/add-product" className={styles.addButton}>
        הוסף מוצר
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>מספר מוצר</th>
            <th>שם מוצר</th>
            <th>מחיר</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}₪</td>
              <td className={styles.actions}>
                <button
                  onClick={() => handleEditClick(product)}
                  className={styles.editButton}
                >
                  ערוך
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className={styles.deleteButton}
                >
                  מחק
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>ערוך מוצר </h2>
            <label>
              שם מוצר:
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
              />
            </label>
            <label>
              מחיר:
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              />
            </label>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
              >
                סגור
              </button>
              <button onClick={handleSaveChanges} className={styles.saveButton}>
                שמור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsManagement;
