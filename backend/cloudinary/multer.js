const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "media-uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "mp4"], // Allowed file types
  },
});

const upload = multer({ storage });

module.exports = upload;
