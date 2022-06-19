const express = require("express");
const {ProductController} = require("../controller");
const {ImageUploadMiddleware} = require("../middleware");
/* const authMiddleware = require("../middleware/login"); */

const ProductRouter = express.Router();

ProductRouter.get("/product/:id", (req, res, next) => {
  ProductController.findById(req, res, next);
});

ProductRouter.get("/product", (req, res, next) => {
  ProductController.findAll(req, res, next);
});

ProductRouter.post("/product", (req, res, next) => {
  ProductController.insert(req, res, next);
});

ProductRouter.post("/product/upload-image", ImageUploadMiddleware.single("image"), (req, res, next) => {
  ProductController.uploadImage(req, res, next);
});

ProductRouter.put("/product/:id", (req, res, next) => {
  ProductController.update(req, res, next);
});

ProductRouter.delete("/product/:id", (req, res, next) => {
  ProductController.delete(req, res, next);
});

module.exports = ProductRouter;
