import React, { useEffect, useState } from 'react';
import styles from '../../assets/stylesManager/UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/admin/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ניהול משתמשים</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>מספר משתמש</th>
            <th>שם מלא</th>
            <th>דוא"ל</th>
            <th>טלפון</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
