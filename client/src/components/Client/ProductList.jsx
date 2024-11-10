
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductItem from './ProductItem';

const ProductList = ({ type }) => {
  const { category } = useParams(); // קבלת הקטגוריה מה-URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?type=${type}`);
        const data = await response.json();
        console.log("Fetched products:", data); // בדיקת הנתונים שהתקבלו מהשרת
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [type]);

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div className="product-list">
      {filteredProducts.map(product => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductItem product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
