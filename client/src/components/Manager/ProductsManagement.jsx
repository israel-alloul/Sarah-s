import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import AddProductForm from './AddProductForm';

function ProductsManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Fetching products from server...');
    fetch('http://localhost:5000/admin/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched products:', data);
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/admin/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Product deleted successfully');
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => console.error('Error deleting product:', error));
  };
  
  const handleEdit = (productId) => {
    // לדוגמה: הצגת תיבת עריכה לעריכת פרטי המוצר
    const updatedName = prompt("Enter new name:");
    const updatedPrice = prompt("Enter new price:");
  
    fetch(`http://localhost:5000/admin/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName, price: updatedPrice }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Product updated successfully');
        setProducts(products.map(product =>
          product.id === productId
            ? { ...product, name: updatedName, price: updatedPrice }
            : product
        ));
      })
      .catch(error => console.error('Error updating product:', error));
  };
  



  return (
    <div>
      <h1>Product Management</h1>
      {/* <AddProductForm /> */}
      <Link to="/manager/add-product">Add New Product</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                 <button onClick={() => handleEdit(product.id)}>Edit</button>
                 <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsManagement;
