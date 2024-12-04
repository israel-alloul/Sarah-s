import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

        <Link to="/login">
                <AccountCircleIcon style={{ fontSize: 40, color: 'white' }} />
        </Link>
        <Link to="/cart"><ShoppingCartIcon style={{ fontSize: 40, color: 'white' }} /> </Link> {/* קישור לסל */}
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
