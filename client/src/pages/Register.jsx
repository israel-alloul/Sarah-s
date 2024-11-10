import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert('הסיסמאות לא תואמות');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('רישום מוצלח!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert('שגיאה במהלך הרישום: ' + (errorData.message || 'משהו השתבש'));
      }
    } catch (error) {
      alert('שגיאה במהלך הרישום: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>רישום</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="שם משתמש"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="סיסמה"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="אישור סיסמה"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">הרשמה</button>
      </form>
    </div>
  );
};

export default Register;
