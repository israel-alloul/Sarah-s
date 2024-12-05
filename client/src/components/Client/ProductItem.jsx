// import React from 'react';

// const ProductItem = ({ product }) => {
//   return (
//     <div className="product-item">
//       <img src={product.image} alt={product.name} style={{ width: "200px", height: "150px" }} />
//       <h3>{product.name}</h3>
//       <p>מחיר: {product.price} ₪</p>
//     </div>
//   );
// };

// export default ProductItem;

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import styles from '../../assets/stylesClient/ProductItem.module.css';

const ProductItem = ({ product }) => {
  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        className={styles.image}
      />
      <CardContent>
        <Typography variant="h6" component="div" className={styles.productName}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={styles.price}>
          מחיר: {product.price} ₪
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
