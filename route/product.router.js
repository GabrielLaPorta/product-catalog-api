const express = require("express");
const {ProductController} = require("../controller");
const {ImageUploadMiddleware} = require("../middleware");

const ProductRouter = express.Router();

ProductRouter.get("/product/:id", ProductController.findById);

ProductRouter.post("/product", ProductController.insert);

ProductRouter.post("/product/upload-image", ImageUploadMiddleware.single("image"), ProductController.uploadImage);

ProductRouter.put("/product/:id", ProductController.update);

ProductRouter.delete("/product/:id", ProductController.delete);

module.exports = ProductRouter;
