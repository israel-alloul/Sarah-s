import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../../assets/stylesClient/Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("EN");
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    telephone: "",
  });
  const email = localStorage.getItem("email");
  const telephone = localStorage.getItem("telephone");

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("username");

      setUsername(storedUsername || "");
      setUserData({
        name: storedUsername || "",
        email: email || "",
        telephone: telephone || "",
      });
    }
  }, [isLoggedIn]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "EN" ? "HE" : "EN"));

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfileOpen = () => {
    setProfileOpen(true);
    handleMenuClose();
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
    setIsEditing(false); // יציאה ממצב עריכה
  };

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, email, telephone, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
      [email]: value,
      [telephone]: value,
    }));
  };

  const handleSaveChanges = async () => {
    console.log("userData:", userData);

    try {
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          telephone: userData.telephone,
          prevEmail: email,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated user:", updatedUser);
        
        
        localStorage.setItem("username", userData.name);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("telephone", userData.telephone);
        setIsEditing(false);
        setProfileOpen(false);
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");
    handleMenuClose();
    navigate("/login");
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
          {language === "EN" ? "עברית" : "English"}
        </button>

        {isLoggedIn ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <AccountCircleIcon style={{ fontSize: 40, color: "white" }} />
            </IconButton>
            <span style={{ color: "white", marginLeft: "10px" }}>
              {username}
            </span>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileOpen}>פרופיל</MenuItem>
              <MenuItem onClick={handleLogout}>התנתק</MenuItem>
            </Menu>
          </>
        ) : (
          <Link to="/login">
            <AccountCircleIcon style={{ fontSize: 40, color: "white" }} />
          </Link>
        )}

        <Link to="/cart">
          <ShoppingCartIcon style={{ fontSize: 40, color: "white" }} />
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/">Logo</Link>
      </div>

      <div className="navbar-right">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <Dialog open={profileOpen} onClose={handleProfileClose}>
        <DialogTitle>פרטי משתמש</DialogTitle>
        <DialogContent>
          {isEditing ? (
            <>
              <TextField
                label="שם משתמש"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="מייל"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="טלפון"
                name="telephone"
                value={userData.telephone}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
            </>
          ) : (
            <>
              <Typography variant="body1">שם משתמש: {userData.name}</Typography>
              <Typography variant="body1">מייל: {userData.email}</Typography>
              <Typography variant="body1">
                טלפון: {userData.telephone}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <Button onClick={handleSaveChanges} color="primary">
              שמור
            </Button>
          ) : (
            <Button onClick={handleEditClick} color="primary">
              ערוך
            </Button>
          )}
          <Button onClick={handleProfileClose} color="secondary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default Navbar;
