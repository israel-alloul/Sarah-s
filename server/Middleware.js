const jwt = require('jsonwebtoken');

// Middleware לאימות טוקן והוספת מידע המשתמש ל-req
 const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // קבלת הטוקן מהכותרת 'Authorization'

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, "1234", (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    console.log('Decoded user:', user); // הדפס את תוכן המשתמש מתוך הטוקן

    req.userId = user.id; // הוספת המידע על המשתמש ל-req
    next();
  });
};

exports.authenticateToken = authenticateToken;