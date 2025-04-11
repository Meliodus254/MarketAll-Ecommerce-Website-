const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { displayName, picture, email, role, cart = [], address = "" } = req.user;

    // Fetch current user details
    const currentUser = await User.findOne({ email });

    let userRole = "subscriber"; // Default role for non-admins
    if (currentUser && currentUser.role === "admin" && role === "admin") {
      userRole = "admin"; // Allow admins to assign the admin role
    }

    // Create or update user
    const user = await User.findOneAndUpdate(
      { email },
      { name: displayName, picture, role: userRole, cart, address },
      { new: true, upsert: true }
    );

    if (!user) {
      return res.status(400).json({ message: "Failed to create or update user" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cart: user.cart,
      address: user.address,
      picture: user.picture,
      token,
    });
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Fetch current user details
exports.currentUser = async (req, res) => {
  try {
    // Find the user by their email from the authenticated user object (req.user)
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Directly generate a JWT token for the current user (optional, if needed)
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,  // Secret key from environment variables
      { expiresIn: '1d' }  // Token expiry time (1 day)
    );

    // Log the generated token for debugging
    console.log("Generated Token:", token);  // Log token here for verification

    // Send the found user data back along with the token
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cart: user.cart,
      address: user.address,
      picture: user.picture,
      token,  // Ensure token is included in the response
    });
  } catch (err) {
    console.error("Error in currentUser:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


