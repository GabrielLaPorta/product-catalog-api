require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer")

cloudinary.config({
    cloud_name: process.env["CLOUD_NAME"],
    api_key: process.env["CLOUD_API_KEY"],
    api_secret: process.env["CLOUD_API_SECRET"],
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "DEV",
    },
});
const ImageUploadMiddleware = (multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const extensionImg = ["image/png", "image/jpg", "image/jpeg"].find(extensionValid => extensionValid == file.mimetype);
        if(extensionImg) {
            return callback(null, true);
        } else {
            return callback(null, false);
        }
    }
}));

module.exports = ImageUploadMiddleware;
