// middlewares/auth.js
const admin = require('../firebase');  // Import the Firebase initialization
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided or invalid format" });
    }

    const token = authorizationHeader.split(" ")[1];
    

    if (!token) {
      return res.status(401).json({ error: "Token missing from Authorization header" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token); // Verify Firebase token
    req.user = {
      _id: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
    };

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


exports.adminCheck = async (req, res, next) => {
  const { email } = req.user; // Get the email of the authenticated user

  // Find the user by email
  const adminUser = await User.findOne({ email }).exec();

  // If the user is not an admin, deny access
  if (adminUser.role !== "admin") {
    return res.status(403).json({
      error: "Admin resource. Access denied.",
    });
  }

  next(); // Proceed if the user is an admin
};
