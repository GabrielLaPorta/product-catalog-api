const express = require("express");
const {CategoryController} = require("../controller");

const CategoryRouter = express.Router();

CategoryRouter.get("/category/:id", CategoryController.findById);

CategoryRouter.post("/category", CategoryController.insert);

CategoryRouter.put("/category/:id", CategoryController.update);

CategoryRouter.delete("/category/:id", CategoryController.delete);

module.exports = CategoryRouter;
