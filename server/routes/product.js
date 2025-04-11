const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const jwt = require("jsonwebtoken");


// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers
const {
  createProduct,
  listProducts,
  adminApproveProduct,
  adminRejectProduct,
  getUnapprovedProducts,
  getApprovedProducts,
  updateProduct,
  getProd,
  getProducts,
  getProductsCount,
  getProductsByCount,
  fetchProducts,
  fetchSellerProducts,
} = require("../controllers/product");

// Routes
// Public Routes
router.get("/products", listProducts);  // List approved products
// Route to fetch products with sorting, ordering, and pagination
router.post("/products", getProducts);

// Route to fetch the total number of products
router.get("/products/total", getProductsCount);

// Route to fetch a specific number of products
router.get("/products/:count", getProductsByCount);




// User Routes
router.post("/product", authCheck, createProduct);


// Admin Routes
router.put("/admin/product/approve/:productId", authCheck, adminCheck, adminApproveProduct);

// Admin rejects a product
router.delete("/admin/product/reject/:productId", authCheck, adminCheck, adminRejectProduct);

// Add the route for fetching unapproved products
router.get("/admin/products/unapproved", authCheck, adminCheck, getUnapprovedProducts);

router.get("/admin/products/approved" ,authCheck , adminCheck, getApprovedProducts);




// Add this route to the product router
router.get("/zuplo/sell", authCheck, fetchSellerProducts);


// Routes: product.js
router.put("/product/:slug", authCheck, updateProduct);


router.get('/product/:slug', getProd);

router.get("/fetch-products", fetchProducts);



module.exports = router;
