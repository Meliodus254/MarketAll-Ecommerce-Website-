const User = require("../models/user");

exports.promoteToAdmin = async (req, res) => {
  const { userId } = req.params; // Get userId from the route params
  const { email } = req.user; // Get the email of the authenticated user (admin)

  // Ensure that the current user is an admin
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    return res.status(403).json({
      error: "Admin resource. Access denied.",
    });
  }

  try {
    // Find the user to promote
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Promote the user to admin
    user.role = "admin";
    await user.save();

    return res.json({ message: "User promoted to admin", user });
  } catch (error) {
    console.error("Error promoting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
