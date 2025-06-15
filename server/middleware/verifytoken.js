// middleware/verifytoken.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // 1) Look for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1]; // “Bearer <token>”
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // 2) Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id: <userId>, iat: <timestamp>, exp: <timestamp> }

    // 3) Attach user (without password) to req.user
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next(); // go on to the next middleware/controller
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token failed or expired' });
  }
};