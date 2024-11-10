import React, { useState, useEffect } from 'react';

function ProductsManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Fetching products from server...');
    fetch('http://localhost:5000/api/products')
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
  
  return (
    <div>
      <h1>Product Management</h1>
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
                {/* כאן תוכל להוסיף כפתורים למחיקה ועריכה */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsManagement;
