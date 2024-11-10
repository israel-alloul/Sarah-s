import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/stylesClient/ProductNavbar.css';

const ProductNavbar = () => {
  const [isCakesOpen, setIsCakesOpen] = useState(false);

  return (
    <div className="product-navbar">
      <div 
        className="product-item"
        onMouseEnter={() => setIsCakesOpen(true)}
        onMouseLeave={() => setIsCakesOpen(false)}
      >
        <Link to="/cakes">עוגות</Link>
        {isCakesOpen && (
          <div className="dropdown-menu">
            <Link to="/cakes/macarons">מקרונים</Link>
            <Link to="/cakes/cream-puffs">פחזניות</Link>
            <Link to="/cakes/pies">פאיים</Link>
          </div>
        )}
      </div>
      <Link to="/trays">מגשים</Link>
      <Link to="/fruit-trays">מגשי פירות</Link>
      <Link to="/chocolates">שוקולדים</Link>
      <Link to="/new-arrivals">מה חדש</Link>
      <Link to="/gifts">מתנות</Link>
      <Link to="/events">אירועים</Link>
    </div>
  );
};

export default ProductNavbar;
