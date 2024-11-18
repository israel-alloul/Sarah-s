import React from 'react';
import { Link } from 'react-router-dom';
// import ProductsManagement from './ProductsManagement';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>לוח ניהול</h1>
      <ul>
        <li><Link to="/manager/client">הצגת משתמשים</Link></li>
        <li><Link to="/manager/products">ניהול מוצרים</Link></li>
        <li><Link to="/manager/orders">ניהול הזמנות</Link></li>
        <li><Link to="/manager/payments">ניהול תשלומים</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
