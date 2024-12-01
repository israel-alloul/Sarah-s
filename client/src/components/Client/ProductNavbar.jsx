// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../../assets/stylesClient/ProductNavbar.css';

// const ProductNavbar = () => {
//   const [isCakesOpen, setIsCakesOpen] = useState(false);

//   return (
//     <div className="product-navbar">
//       <div 
//         className="product-item"
//         onMouseEnter={() => setIsCakesOpen(true)}
//         onMouseLeave={() => setIsCakesOpen(false)}
//       >
//         <Link to="/cakes">עוגות</Link>
//         {isCakesOpen && (
//           <div className="dropdown-menu">
//             <Link to="/cakes/macarons">מקרונים</Link>
//             <Link to="/cakes/cream-puffs">פחזניות</Link>
//             <Link to="/cakes/pies">פאיים</Link>
//           </div>
//         )}
//       </div>
//       <Link to="/trays">מגשים</Link>
//       <Link to="/fruit-trays">מגשי פירות</Link>
//       <Link to="/chocolates">שוקולדים</Link>
//       <Link to="/new-arrivals">מה חדש</Link>
//       <Link to="/gifts">מתנות</Link>
//       <Link to="/events">אירועים</Link>
//     </div>
//   );
// };

// export default ProductNavbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesClient/ProductNavbar.module.css';

const ProductNavbar = () => {
  const [isCakesOpen, setIsCakesOpen] = useState(false);

  return (
    <div className={styles.productNavbar}>
      <div 
        className={styles.productItemWrapper}
        onMouseEnter={() => setIsCakesOpen(true)}
        onMouseLeave={() => setIsCakesOpen(false)}
      >
        <Link to="/cakes" className={styles.productItem}>עוגות</Link>
        {isCakesOpen && (
          <div className={styles.dropdownMenu}>
            <Link to="/cakes/macarons">מקרונים</Link>
            <Link to="/cakes/cream-puffs">פחזניות</Link>
            <Link to="/cakes/pies">פאיים</Link>
          </div>
        )}
      </div>
      <Link to="/trays" className={styles.productItem}>מגשים</Link>
      <Link to="/fruit-trays" className={styles.productItem}>מגשי פירות</Link>
      <Link to="/chocolates" className={styles.productItem}>שוקולדים</Link>
      <Link to="/new-arrivals" className={styles.productItem}>מה חדש</Link>
      <Link to="/gifts" className={styles.productItem}>מתנות</Link>
      <Link to="/events" className={styles.productItem}>אירועים</Link>
    </div>
  );
};

export default ProductNavbar;
