// import React, { useEffect, useState } from 'react';
// import {Link, useParams } from 'react-router-dom';
// import ProductItem from './ProductItem';

// const ProductList = ({ type }) => {
//   const { category } = useParams(); // קבלת הקטגוריה מה-URL
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/products?type=${type}`);
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.log("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, [type]);

//   // אם יש קטגוריה ב-URL, נסנן את המוצרים לפי קטגוריה
//   const filteredProducts = category
//     ? products.filter(product => product.category === category)
//     : products;

//   return (
//     <div className="product-list">
//       {filteredProducts.map(product => (
//         <Link key={product.id} to={`/product/${product.id}`}>
//           <ProductItem product={product} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductItem from './ProductItem';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import styles from '../../assets/stylesClient/ProductList.module.css' // קובץ CSS מותאם

const ProductList = ({ type }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?type=${type}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [type]);

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        {category ? `מוצרים בקטגוריה: ${category}` : 'רשימת מוצרים'}
      </Typography>

      {loading ? (
        <Box className={styles.loader}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} className={styles.grid}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Link to={`/product/${product.id}`} className={styles.productLink}>
                <ProductItem product={product} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProductList;
