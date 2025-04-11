const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber", // Default role is subscriber
      enum: ["subscriber", "admin"], // Add the admin role
    },
    cart: {
      type: Array,
      default: [], // Default empty cart
    },
    address: {
      type: String,
      default: "", // Default empty address
    },
    picture: String, // Profile picture
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
