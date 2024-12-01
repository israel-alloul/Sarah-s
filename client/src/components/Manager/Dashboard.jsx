// import React from 'react';
// import { Link } from 'react-router-dom';
// // import ProductsManagement from './ProductsManagement';

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <h1>לוח ניהול</h1>
//       <ul>
//         <li><Link to="/manager/client">הצגת משתמשים</Link></li>
//         <li><Link to="/manager/products">ניהול מוצרים</Link></li>
//         <li><Link to="/manager/orders">ניהול הזמנות</Link></li>
//         <li><Link to="/manager/payments">ניהול תשלומים</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/stylesManager/Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>לוח ניהול</h1>
      <ul className={styles.dashboardList}>
        <li className={styles.dashboardListItem}>
          <Link to="/manager/client" className={styles.dashboardLink}>
            הצגת משתמשים
          </Link>
        </li>
        <li className={styles.dashboardListItem}>
          <Link to="/manager/products" className={styles.dashboardLink}>
            ניהול מוצרים
          </Link>
        </li>
        <li className={styles.dashboardListItem}>
          <Link to="/manager/orders" className={styles.dashboardLink}>
            ניהול הזמנות
          </Link>
        </li>
        <li className={styles.dashboardListItem}>
          <Link to="/manager/payments" className={styles.dashboardLink}>
            ניהול תשלומים
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
