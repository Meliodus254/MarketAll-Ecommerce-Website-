const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Config for Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Image (Cloudinary + Local Storage)
exports.upload = async (req, res) => {
  try {
    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // Auto-detect file type
    });

    // Save a copy locally (optional)
    const imageBuffer = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const localFilePath = path.join(__dirname, `../uploads/${cloudinaryResult.public_id}.jpg`);

    fs.writeFileSync(localFilePath, imageBuffer);

    // Respond with both URLs
    res.json({
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
      local_url: `/uploads/${cloudinaryResult.public_id}.jpg`,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};

// Remove Image (Cloudinary + Local Storage)
exports.remove = async (req, res) => {
  try {
    const { public_id } = req.body;

    // Remove from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(public_id);

    // Remove from local storage
    const localFilePath = path.join(__dirname, `../uploads/${public_id}.jpg`);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    if (cloudinaryResult.result === "ok") {
      res.send("ok");
    } else {
      throw new Error("Image deletion failed");
    }
  } catch (err) {
    console.error("Remove Error:", err);
    res.status(500).json({ error: "Image deletion failed" });
  }
};
