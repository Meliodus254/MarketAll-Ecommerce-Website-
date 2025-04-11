const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controller
const { create, read, update, remove, list, listByCategory } = require("../controllers/sub");

// Routes for subcategory management
router.post("/sub", authCheck, adminCheck, create); // Admin creates a subcategory
router.get("/subs", list); // Get all subcategories
router.get("/sub/:slug", read); // Get a specific subcategory by slug
router.put("/sub/:slug", authCheck, adminCheck, update); // Admin updates a subcategory
router.delete("/sub/:slug", authCheck, adminCheck, remove); // Admin deletes a subcategory

// Fetch subcategories by category ID
router.get("/category/:categoryId/subs", listByCategory); // Fetch subcategories by category

module.exports = router;
