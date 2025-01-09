// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { redeemTree } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Admin login using fixed credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin1@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'adminpassword123';

// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      let user = await User.findOne({ email });
      if (!user) {
          // If the email matches admin, manually verify credentials
          if (email === ADMIN_EMAIL) {
              const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD);
              if (!isMatch) {
                  return res.status(400).json({ msg: "Invalid admin credentials" });
              }
              // Admin login - Return Admin Token
              const payload = { user: { id: "admin", email: ADMIN_EMAIL, username: "admin", role: 'admin' } };
              jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                  if (err) throw err;
                  res.json({ token, userType: 'admin' });  // Send token as Admin
              });
              return;
          }

          return res.status(400).json({ msg: "Invalid Credentials" });
      } else {
          // Normal User login, check password for user
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(400).json({ msg: "Invalid Credentials" });
          }

          // User login success
          const payload = { user: { id: user.id, email: user.email, username: user.username, role: user.role } };
          jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
              if (err) throw err;
              res.json({ token, userType: user.role });  // Send token and user role (user/admin)
          });
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

//redeem-tree
router.post('/redeem-tree', verifyToken, async (req, res) => {
  try {
      const { treeType, pointsRequired } = req.body;
      const userId = req.user.id; // Extracted from token

      // Find user by `userId`
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: "User not found" });

      // Check if user has enough points
      if (user.points < pointsRequired) {
          return res.status(400).json({ msg: "Insufficient points" });
      }

      // Deduct points and add tree to redeemedTrees
      user.points -= pointsRequired;
      user.redeemedTrees.push({ treeType, pointsUsed: pointsRequired });
      await user.save();

      res.json({ msg: "Tree redeemed successfully", user });
  } catch (err) {
      res.status(500).json({ msg: "Server Error" });
  }
});

// User Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if admin is registering
      if (email === ADMIN_EMAIL) {
          // Admin's password encryption process
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

          // Manually create the admin in DB with role as 'admin'
          const adminUser = new User({
              username,
              email,
              password: hashedPassword,
              role: 'admin',  // explicitly set 'admin' role
          });

          await adminUser.save();

          const payload = { user: { id: adminUser.id, email: adminUser.email, username: adminUser.username, role: 'admin' } };

          // Create JWT and send token to admin
          jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
              if (err) throw err;
              res.json({ token, userType: 'admin' });  // Send admin token
          });
          return;
      }

      // Normal user registration (check if user exists)
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Register the user as a normal user by default
      user = new User({
          username,
          email,
          password: hashedPassword,
          role: 'user',  // role is automatically 'user'
      });

      await user.save();

      const payload = { user: { id: user.id, email: user.email, username: user.username, role: user.role } };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.json({ token, userType: 'user' });  // Send regular user token
      });

  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;
