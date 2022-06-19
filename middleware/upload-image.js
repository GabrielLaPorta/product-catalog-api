const multer = require("multer")
const ImageUploadMiddleware = (multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "./public/images");
        },
        filename: (req, file, callback) => {
            callback(null, `${Date.now().toString()}_${file.originalname}`);
        }
    }),
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
