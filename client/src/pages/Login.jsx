// // Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../assets/stylesClient/Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('customer'); // ברירת מחדל: לקוח
//   const navigate = useNavigate();

//   const handleLogin = () => {

    

//     if (userType === 'manager' && email === 'manager@example.com' && password === 'admin123') {
//       // התחברות מוצלחת של מנהל
//       navigate('/dashboard'); // ניווט ל-Dashboard
//     } else if (userType === 'customer' && email === 'customer@example.com' && password === 'customer123') {
//       // התחברות מוצלחת של לקוח
//       alert('התחברות מוצלחת כלקוח!');
//       // כאן אפשר להוסיף ניווט לעמוד אחר אם תרצה
//     } else {
//       alert('שם משתמש או סיסמה לא נכונים');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>התחברות</h2>
//       <select value={userType} onChange={(e) => setUserType(e.target.value)}>
//         <option value="customer">לקוח</option>
//         <option value="manager">מנהל</option>
//       </select>
//       <input
//         type="email"
//         placeholder="אימייל"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="סיסמה"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>התחבר</button>
//     </div>
//   );
// };

// export default Login;

// /*****************
//  * 
//  * 
//  * 
//  */

// Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../assets/stylesClient/Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('customer');
//   const navigate = useNavigate();

//   const handleLogin = () => {

//     if (userType === 'manager' && email === 'manager@example.com' && password === 'admin123') {
//       localStorage.setItem('isLoggedIn', 'true'); // שמירת מצב התחברות
//       navigate('/dashboard');
//     } else if (userType === 'customer' && email === 'customer@example.com' && password === 'customer123') {
//       localStorage.setItem('isLoggedIn', 'true'); // שמירת מצב התחברות
//       alert('התחברות מוצלחת כלקוח!');
//       navigate('/checkout'); // ניווט לעמוד התשלום לאחר התחברות
//     } else {
//       alert('שם משתמש או סיסמה לא נכונים');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>התחברות</h2>
//       <select value={userType} onChange={(e) => setUserType(e.target.value)}>
//         <option value="customer">לקוח</option>
//         <option value="manager">מנהל</option>
//       </select>
//       <input
//         type="email"
//         placeholder="אימייל"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="סיסמה"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>התחבר</button>
//       {" "}
//       <button onClick={() => navigate('/register')}>הרשמה</button>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/stylesClient/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer'); // שמירת סוג המשתמש
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // שמירת ה-token ב-localStorage
        localStorage.setItem('isLoggedIn', 'true'); 

        // ניווט לפי סוג המשתמש
        if (userType === 'manager') {
          navigate('/dashboard');
        } else {
          alert('התחברות מוצלחת כלקוח!');
          navigate('/checkout');
        }
      } else {
        alert('שם משתמש או סיסמה לא נכונים');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('שגיאה במהלך ההתחברות');
    }
  };

  return (
    <div className="login-container">
      <h2>התחברות</h2>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="customer">לקוח</option>
        <option value="manager">מנהל</option>
      </select>
      <input
        type="text"
        placeholder="שם משתמש"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>התחבר</button>
      {" "}
      <button onClick={() => navigate('/register')}>הרשמה</button>
    </div>
  );
};

export default Login;
