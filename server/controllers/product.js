const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");
const mongoose = require("mongoose");
const cloudinary = require('../utils/cloudinary');
const { authCheck } = require("../middlewares/auth");


// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      subs,
      quantity,
      shipping,
      color,
      brand,
      images,
      condition,
      location, // New field
    } = req.body;

    if (!location || !location.name || !location.coordinates) {
      return res
        .status(400)
        .json({ success: false, error: "Location details are required" });
    }

    const slug = slugify(title, { lower: true, strict: true });
    const existingSlug = await Product.findOne({ slug });
    if (existingSlug) {
      return res
        .status(400)
        .json({ success: false, error: "Product title must be unique" });
    }

    const product = new Product({
      title,
      slug,
      description,
      price,
      category,
      subs,
      quantity,
      shipping,
      color,
      brand,
      images,
      condition,
      location, // Save location
      createdBy: req.user._id,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};



exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({ approved: true }).populate("category subs");
    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" });
    }
    res.json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, error: "Error fetching products" });
  }
};


// Admin approves a product
exports.adminApproveProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(
      productId,
      { approved: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error("Error approving product:", err);
    res.status(500).json({ success: false, error: "Error approving product" });
  }
};

// Admin rejects a product
exports.adminRejectProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    await Product.findByIdAndDelete(productId); // Remove the product from the database

    res.json({ success: true, message: `Product "${product.title}" has been rejected and deleted.` });
  } catch (err) {
    console.error("Error rejecting product:", err);
    res.status(500).json({ success: false, error: "Error rejecting product" });
  }
};


exports.getUnapprovedProducts = async (req, res) => {
  try {
    // Find unapproved products and populate category and subs fields
    const products = await Product.find({ approved: false })
      .populate("category subs")
      .populate("createdByObject", "name email");  // Populate createdByObject with user details (name and email)

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: "No unapproved products found" });
    }

    // No need to manually query the user anymore, populate does that for us
    const populatedProducts = products.map((product) => {
      // createdByObject will be populated with user details automatically
      return { ...product._doc, createdBy: product.createdByObject };
    });

    res.json({ success: true, products: populatedProducts });
  } catch (err) {
    console.error("Error fetching unapproved products:", err);
    res.status(500).json({ success: false, error: "Error fetching unapproved products" });
  }
};


exports.getApprovedProducts = async (req, res) => {
  try {
    // Find unapproved products and populate category and subs fields
    const products = await Product.find({ approved: true })
      .populate("category subs")
      .populate("createdByObject", "name email");  // Populate createdByObject with user details (name and email)

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: "No unapproved products found" });
    }

    // No need to manually query the user anymore, populate does that for us
    const populatedProducts = products.map((product) => {
      // createdByObject will be populated with user details automatically
      return { ...product._doc, createdBy: product.createdByObject };
    });

    res.json({ success: true, products: populatedProducts });
  } catch (err) {
    console.error("Error fetching approved products:", err);
    res.status(500).json({ success: false, error: "Error fetching approved products" });
  }
};





// Controller: product.js
exports.updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      title,
      description,
      price,
      category,
      subs,
      quantity,
      shipping,
      color,
      brand,
      images,
      condition,
      location, // New field
    } = req.body;

    if (condition && !["New", "Used", "Refurbished"].includes(condition)) {
      return res.status(400).json({ success: false, error: "Invalid product condition" });
    }

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.subs = subs || product.subs;
    product.quantity = quantity || product.quantity;
    product.shipping = shipping || product.shipping;
    product.color = color || product.color;
    product.brand = brand || product.brand;
    product.images = images || product.images;
    product.condition = condition || product.condition;
    product.location = location || product.location; // Update condition

    product.approved = false;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const { sort = 'createdAt', order = 'desc', page = 1 } = req.body;
    const pageSize = 10; // Define how many products per page
    const skip = (page - 1) * pageSize;

    // Fetch only approved products
    const products = await Product.find({ approved: true })
      .sort({ [sort]: order })
      .skip(skip)
      .limit(pageSize);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get the total count of approved products
exports.getProductsCount = async (req, res) => {
  try {
    const count = await Product.countDocuments({ approved: true }); // Count only approved products
    res.json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product count' });
  }
};

// Get a specific number of approved products
exports.getProductsByCount = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const products = await Product.find({ approved: true })
      .sort({ createdAt: 'desc' }) // Default sort by newest
      .limit(count);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};



exports.getProd = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the product by slug
    const product = await Product.findOne({ slug }).populate("category").populate("subs");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Server error" });
  }
};






exports.fetchProducts = async (req, res) => {
  try {
    const { sort = "createdAt", order = "desc", page = 1, limit = 10, category, search } = req.query;

    const skip = (page - 1) * limit;
    const filter = { approved: true };

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .sort({ [sort]: order })
      .skip(skip)
      .limit(Number(limit))
      .populate("category subs");

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};



// controllers/product.js
exports.fetchSellerProducts = async (req, res) => {
  console.log("fetchSellerProducts invoked");
  try {
    console.log("fetchSellerProducts invoked");
    const sellerId = req.user._id; // Seller ID from middleware
    console.log("Fetching products for seller ID:", sellerId);

    // Log the query for approved products
    const approvedQuery = { createdBy: sellerId, approved: true };
    console.log("Approved Products Query:", approvedQuery);
    const approvedProducts = await Product.find(approvedQuery)
      .populate("category subs")
      .sort({ createdAt: -1 });

    // Log the query for unapproved products
    const unapprovedQuery = { createdBy: sellerId, approved: false };
    console.log("Unapproved Products Query:", unapprovedQuery);
    const unapprovedProducts = await Product.find(unapprovedQuery)
      .populate("category subs")
      .sort({ createdAt: -1 });

    // Log the results
    console.log("Approved Products Result:", approvedProducts);
    console.log("Unapproved Products Result:", unapprovedProducts);

    res.status(200).json({
      success: true,
      products: { approved: approvedProducts, unapproved: unapprovedProducts },
    });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};



