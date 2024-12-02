import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../assets/stylesClient/ProductNavbar.module.css';

const ProductNavbar = () => {
  const location = useLocation();

  // Hooks תמיד ייקראו ללא תנאי
  const [isCakesOpen, setIsCakesOpen] = useState(false);
  const [isTraysOpen, setIsTraysOpen] = useState(false);
  const [isSaladsOpen, setIsSaladsOpen] = useState(false);

  // בדיקה אם להציג את ה-Navbar
  const shouldHideNavbar = location.pathname.includes('dashboard') || location.pathname.includes('manager');

  if (shouldHideNavbar) {
    return null;
  }

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
            <Link to="/cakes/big-cakes">עוגות גדולות</Link>
            <Link to="/cakes/birthday-cakes">עוגות יום הולדת</Link>
            <Link to="/cakes/maroccan-cakes">עוגות מרוקאיות</Link>
            <Link to="/cakes/branding">מיתוג</Link>
          </div>
        )}
      </div>

      <div 
        className={styles.productItemWrapper}
        onMouseEnter={() => setIsTraysOpen(true)}
        onMouseLeave={() => setIsTraysOpen(false)}
      >
        <Link to="/trays" className={styles.productItem}>מגשים</Link>
        {isTraysOpen && (
          <div className={styles.dropdownMenu}>
            <Link to="/trays/salty-trays">מגשים מלוחים</Link>
            <Link to="/trays/sweet-trays">מגשים מתוקים</Link>
          </div>
        )}
      </div>

      <div 
        className={styles.productItemWrapper}
        onMouseEnter={() => setIsSaladsOpen(true)}
        onMouseLeave={() => setIsSaladsOpen(false)}
      >
        <Link to="/salads" className={styles.productItem}>סלטים</Link>
        {isSaladsOpen && (
          <div className={styles.dropdownMenu}>
            <Link to="/salads/greek-salad">סלט יווני</Link>
            <Link to="/salads/caesar-salad">סלט קיסר</Link>
            <Link to="/salads/mixed-salad">סלט מעורב</Link>
          </div>
        )}
      </div>

      <Link to="/fruit-trays" className={styles.productItem}>מגשי פירות</Link>
      <Link to="/chocolates" className={styles.productItem}>שוקולדים</Link>
      <Link to="/new-arrivals" className={styles.productItem}>מה חדש</Link>
      <Link to="/events" className={styles.productItem}>אירועי בוטיק</Link>
    </div>
  );
};

export default ProductNavbar;
