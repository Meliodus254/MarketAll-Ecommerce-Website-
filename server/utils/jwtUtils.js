const jwt = require('jsonwebtoken');

// Function to generate a JWT token
exports.generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },  // Payload (user data)
    process.env.JWT_SECRET,  // Secret key from environment variables
    { expiresIn: '1d' }  // Token expiry time (1 day)
  );
};
