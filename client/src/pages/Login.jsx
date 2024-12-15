import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/stylesClient/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        localStorage.setItem("token", data.token); // שמירת ה-token ב-localStorage
        localStorage.setItem("role", data.role);
        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("telephone", data.phone);
        localStorage.setItem("userId", data.userId);
         // בהנחה ש-`userData.name` הוא שם המשתמש

        // ניווט לפי סוג המשתמש
        if (data.role === "manager") {
          navigate("/dashboard");
        } else {
          alert("התחברות מוצלחת כלקוח!");
          navigate("/checkout");
        }
      } else {
        alert("שם משתמש או סיסמה לא נכונים");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("שגיאה במהלך ההתחברות");
    }
  };

  return (
    <div className="login-container">
      <h2>התחברות</h2>
      <input
        type="text"
        placeholder="אימייל"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>התחבר</button>{" "}
      <button onClick={() => navigate("/register")}>הרשמה</button>
    </div>
  );
};

export default Login;
