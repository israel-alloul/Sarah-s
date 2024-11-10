import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} style={{ width: "200px", height: "150px" }} />
      <h3>{product.name}</h3>
      <p>מחיר: {product.price} ₪</p>
    </div>
  );
};

export default ProductItem;
