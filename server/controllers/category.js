const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;

    // Ensure the category name is provided
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Check for duplicate category
    const existingCategory = await Category.findOne({ slug: slugify(name) });
    if (existingCategory) {
      return res.status(400).json({ error: "Category with this name already exists" });
    }

    const category = new Category({
      name,
      slug: slugify(name),
      parentCategory: parentCategory || null,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: "Category creation failed", details: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch categories", details: err.message });
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch category details", details: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;

    const existingCategory = await Category.findOne({ slug: req.params.slug });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: name || existingCategory.name,
        slug: name ? slugify(name) : existingCategory.slug,
        parentCategory: parentCategory !== undefined ? parentCategory : existingCategory.parentCategory,
      },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: "Category update failed", details: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({ slug: req.params.slug });
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(deletedCategory);
  } catch (err) {
    res.status(400).json({ error: "Category delete failed", details: err.message });
  }
};
