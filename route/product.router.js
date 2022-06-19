const express = require("express");
const {ProductController} = require("../controller");
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

ProductRouter.put("/product", (req, res, next) => {
  ProductController.update(req, res, next);
});

ProductRouter.delete("/product/:id", (req, res, next) => {
  ProductController.delete(req, res, next);
});

module.exports = ProductRouter;
