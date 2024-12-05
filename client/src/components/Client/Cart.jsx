// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../context/CartContext";

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

//   const navigate = useNavigate();

//   const handleContinueShopping = () => {
//     navigate("/cakes"); // מחזיר לדף הקטגוריה כדי להמשיך בקניות
//   };

//   const handleCheckout = () => {
//     navigate("/checkout", { state: { cartItems } }); // מעביר לדף התחברות/רישום
//   };

//   // פונקציה לחישוב סך הכל של כל הפריטים בסל
//   const calculateTotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   return (
//     <div className="cart">
//       <h2>הסל שלך</h2>
//       {cartItems.length === 0 ? (
//         <p>הסל שלך ריק</p>
//       ) : (
//         <div>
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 style={{ width: "50px", height: "50px" }}
//               />
//               <div>
//                 <h3>{item.name}</h3>
//                 <p>מחיר יחידה: {item.price} ₪</p>
//                 <p>מחיר כולל: {item.price * item.quantity} ₪</p>{" "}
//                 {/* מחיר פריט כפול כמות */}
//                 <div className="quantity-control">
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button onClick={() => removeFromCart(item.id)}>הסר</button>
//               </div>
//             </div>
//           ))}
//           <h3>סך הכל לסל: {calculateTotal()} ₪</h3> {/* הצגת הסך הכל */}
//           <button onClick={handleContinueShopping}>המשך בקניות</button>
//           <button onClick={handleCheckout}>המשך לתשלום</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Button, Typography, Card, CardMedia, CardContent, IconButton, Box } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import styles from "../../assets/stylesClient/Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleContinueShopping = () => navigate("/cakes");

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // בדיקת התחברות

    if (isLoggedIn) {
      navigate("/checkout", { state: { cartItems } });
    } else {
      navigate("/login", { state: { from: "/checkout", cartItems } }); // נווט ל-login עם יעד חזרה ל-checkout
    }
  };

  const calculateTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <Typography variant="h4" className={styles.title}>הסל שלך</Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">הסל שלך ריק</Typography>
      ) : (
        <div className={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <Card key={item.id} className={styles.cartItem}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <CardContent className={styles.itemDetails}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">מחיר יחידה: {item.price} ₪</Typography>
                <Typography variant="body1">מחיר כולל: {item.price * item.quantity} ₪</Typography>
                <Box className={styles.quantityControl}>
                  <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Add />
                  </IconButton>
                </Box>
                <IconButton onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h5" className={styles.total}>סך הכל: {calculateTotal()} ₪</Typography>

          <div className={styles.buttonsContainer}>
            <Button variant="outlined" color="primary" onClick={handleContinueShopping}>
              המשך בקניות
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCheckout}>
              המשך לתשלום
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
