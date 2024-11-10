// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // המשתמש המחובר, אם קיים

//   // פונקציה להתחברות
//   const login = (userData) => {
//     setUser(userData);
//   };

//   // פונקציה לרישום
//   const register = (userData) => {
//     setUser(userData);
//   };

//   // פונקציה ליציאה מהחשבון
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
