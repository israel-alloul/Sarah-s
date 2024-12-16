import React, { useState } from 'react';
import styles from '../../assets/stylesManager/AddProductForm.module.css';

function AddProductForm() {
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Product added successfully');
      alert('Product added successfully');
    })
    .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>הוספת מוצר חדש</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>סוג המוצר:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={styles.input}
            placeholder="type"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>קטגוריה:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.input}
            placeholder="category"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>שם המוצר:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>תיאור המוצר:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
            placeholder="description"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>מחיר:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
            placeholder="price"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>קישור לתמונה:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={styles.input}
            placeholder="url"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          הוסף מוצר
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
