import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/stylesClient/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('EN');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'EN' ? 'HE' : 'EN'));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <input
          type="text"
          placeholder="חפש..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={toggleLanguage}>
          {language === 'EN' ? 'עברית' : 'English'}
        </button>
        <Link to="/login">Login</Link>
        <Link to="/cart">סל הקניות</Link> {/* קישור לסל */}
      </div>
      <div className="navbar-center">
        <Link to="/">Logo</Link>
      </div>
      <div className="navbar-right">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
