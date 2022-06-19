const express = require("express");
const {CategoryController} = require("../controller");
/* const authMiddleware = require("../middleware/login"); */

const CategoryRouter = express.Router();

CategoryRouter.get("/category/:id", (req, res, next) => {
  CategoryController.findById(req, res, next);
});

CategoryRouter.get("/category", (req, res, next) => {
  CategoryController.findAll(req, res, next);
});

CategoryRouter.post("/category", (req, res, next) => {
  CategoryController.insert(req, res, next);
});

CategoryRouter.put("/category/:id", (req, res, next) => {
  CategoryController.update(req, res, next);
});

CategoryRouter.delete("/category/:id", (req, res, next) => {
  CategoryController.delete(req, res, next);
});

module.exports = CategoryRouter;
