
import React from 'react';
import { Card, CardMedia, CardContent, Typography} from '@mui/material';
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
