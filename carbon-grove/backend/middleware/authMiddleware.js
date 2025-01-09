// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware to verify if the user is authenticated
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: "No authentication token, access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    } 
};

// For Admin-only access (verify admin's email and password)
const verifyAdmin = async (req, res, next) => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin1@example.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'adminpassword123';

  // Check if the user is the admin
  if (req.user.email === ADMIN_EMAIL) {
      // Compare the user password with the predefined admin password
      if (req.body.password !== ADMIN_PASSWORD) {
        return res.status(400).json({ msg: "Invalid admin password" });
    }
      
  } else {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }

  next();
};

module.exports = { verifyToken, verifyAdmin };
