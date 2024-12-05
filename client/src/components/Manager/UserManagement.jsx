import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';  // אייקון חיפוש
import styles from '../../assets/stylesManager/UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/admin/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  
    const filtered = users.filter(user =>
      (user.username && user.username.toLowerCase().includes(term.toLowerCase())) ||
      (user.phone && user.phone.includes(term)) ||
      (user.email && user.email.toLowerCase().includes(term.toLowerCase()))
    );
  
    setFilteredUsers(filtered);
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ניהול משתמשים</h1>

      <div className={styles.searchContainer}>
  <div className={styles.searchWrapper}>
    <input
      type="text"
    placeholder="חיפוש לפי שם מייל או מספר טלפון"

      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      className={styles.searchInput}
    />
    <FaSearch className={styles.searchIcon} />
  </div>
</div>


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
          {filteredUsers.map(user => (
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
