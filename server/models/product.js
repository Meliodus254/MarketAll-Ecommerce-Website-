const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subs: [
      {
        type: Types.ObjectId,
        ref: "Sub",
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: [
        "Black",
        "White",
        "Red",
        "Green",
        "Blue",
        "Yellow",
        "Pink",
        "Purple",
        "Orange",
        "Gray",
        "Brown",
        "Gold",
        "Silver",
      ],
    },
    brand: {
      type: String,
      enum: [
        "Apple",
        "Samsung",
        "Dell",
        "Nike",
        "Adidas",
        "Sony",
        "LG",
        "Huawei",
        "Microsoft",
        "Lenovo",
      ],
    },
    condition: {
      type: String,
      enum: ["New", "Used", "Refurbished"],
      required: true, // Mandatory
    },
    createdBy: {
      type: String,
      ref: "User",
      required: true,
    },
    createdByObject: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    location: {
      name: { type: String, required: true }, // Location name (e.g., city, address)
      coordinates: {
        lat: { type: Number, required: true }, // Latitude
        lng: { type: Number, required: true }, // Longitude
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
