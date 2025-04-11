const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

// routes for category management
router.post("/category", authCheck, adminCheck, create); // Admin creates a category
router.get("/categories", list); // List all categories (admin and public)
router.get("/category/:slug", read); // Get a specific category by slug
router.put("/category/:slug", authCheck, adminCheck, update); // Admin updates a category
router.delete("/category/:slug", authCheck, adminCheck, remove); // Admin deletes a category

module.exports = router;
