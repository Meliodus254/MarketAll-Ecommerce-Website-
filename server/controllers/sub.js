// Controller for Subcategories
const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = new Sub({ name, parent, slug: slugify(name) });
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    console.error("SUB CREATE ERR ----->", err);
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) => {
  try {
    console.log("Fetching all subcategories..."); // Log to ensure this is called
    const subcategories = await Sub.find({}).sort({ createdAt: -1 }).exec();
    res.json(subcategories);
  } catch (err) {
    console.error("SUB LIST ERR ----->", err);
    res.status(400).send("Failed to fetch subcategories");
  }
};

// Fetch subcategories based on the category ID
exports.listByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; // Category ID to filter subcategories
    const subcategories = await Sub.find({ parent: categoryId }).exec();
    res.json(subcategories);
  } catch (err) {
    console.error("SUB LIST BY CATEGORY ERR ----->", err);
    res.status(400).send("Failed to fetch subcategories by category");
  }
};

exports.read = async (req, res) => {
  try {
    const sub = await Sub.findOne({ slug: req.params.slug }).exec();
    res.json(sub);
  } catch (err) {
    console.error("SUB READ ERR ----->", err);
    res.status(400).send("Sub not found");
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("SUB UPDATE ERR ----->", err);
    res.status(400).send("Sub update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.error("SUB DELETE ERR ----->", err);
    res.status(400).send("Sub delete failed");
  }
};
