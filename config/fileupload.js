const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
const storage = cloudinaryStorage({
  cloudinary,
  folder: "product-image"

});
// "multer" creates uploader objects that integrate with Express routes
// (uploader objects allow routes to receive files)
const fileUploader = multer({ storage });
module.exports = fileUploader;



