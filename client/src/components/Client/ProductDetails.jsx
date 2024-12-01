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



import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // קריאה לשרת כדי להביא את פרטי המוצר
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

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <img
        src={product.image}
        alt={product.name}
        className="product-image-large"
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} ₪</p>

      <div className="quantity-control">
        <button onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>+</button>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
