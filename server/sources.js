require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async function authenaticateToken(req, res, next) {
  console.log(req.headers);

  const token = await req.headers["athorization"];

  if (!token)
    return res.status(401).json({ message: "Access denied", succeed: false });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid token", succeed: false });

    req.user = user;
    next();
  });
};

module.export = async function extractingUserDetails(token) {
  let userDetails;
  await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    userDetails = user;
  });
  console.log("userDetails: ", userDetails);

  return userDetails;
};
