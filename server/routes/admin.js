const express = require("express");
const router = express.Router();
const { authCheck } = require("../middlewares/auth");  // Auth check middleware
const { adminCheck } = require("../middlewares/auth"); // Admin check middleware
const { promoteToAdmin } = require("../controllers/adminController"); // Controller to promote user

// Ensure both authentication and admin check for this route
router.put("/promote/:userId", authCheck, adminCheck, promoteToAdmin);

module.exports = router;
