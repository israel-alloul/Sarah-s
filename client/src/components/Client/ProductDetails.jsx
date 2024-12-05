// import React, { useContext, useState } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import products from "../../data/Product";
// import { CartContext } from "../../context/CartContext";

// const ProductDetails = () => {
//   const { addToCart } = useContext(CartContext);
//   const { productId } = useParams(); 
//   const navigate = useNavigate();// וודא ששימוש בשם זהה לנתיב
//   const product = products.find((item) => item.id === parseInt(productId));
//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//     navigate("/cart");
//   };

//   const [quantity, setQuantity] = useState(1);

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   return (
//     <div className="product-details">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="product-image-large"
//       />
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>{product.price} ₪</p>

//       <div className="quantity-control">
//         <button onClick={decreaseQuantity}>-</button>
//         <span>{quantity}</span>
//         <button onClick={increaseQuantity}>+</button>
//       </div>

//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductDetails;



// import React, { useContext, useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { CartContext } from "../../context/CartContext";

// const ProductDetails = () => {
//   const { addToCart } = useContext(CartContext);
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   // קריאה לשרת כדי להביא את פרטי המוצר
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//         if (!response.ok) {
//           throw new Error("Product not found");
//         }
//         const data = await response.json();
//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//     navigate("/cart");
//   };

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="product-details">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="product-image-large"
//       />
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>{product.price} ₪</p>

//       <div className="quantity-control">
//         <button onClick={decreaseQuantity}>-</button>
//         <span>{quantity}</span>
//         <button onClick={increaseQuantity}>+</button>
//       </div>

//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Button, Typography, Card, CardMedia, CardContent, Box, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "../../assets/stylesClient/ProductDetails.module.css";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  if (!product) {
    return <Typography variant="h5" align="center">Product not found</Typography>;
  }

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        className={styles.image}
      />
      <CardContent>
        <Typography variant="h4" className={styles.title}>
          {product.name}
        </Typography>
        <Typography variant="body1" className={styles.description}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="secondary" className={styles.price}>
          {product.price} ₪
        </Typography>

        <Box className={styles.quantityControl}>
          <IconButton onClick={decreaseQuantity}>
            <Remove />
          </IconButton>
          <Typography variant="h6">{quantity}</Typography>
          <IconButton onClick={increaseQuantity}>
            <Add />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          className={styles.addToCartButton}
        >
          הוסף לסל
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
