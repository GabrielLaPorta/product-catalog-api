const express = require("express");
const {CategoryController} = require("../controller");
const {ProductController} = require("../controller");
const PublicRouter = express.Router();

PublicRouter.get("/category", CategoryController.findAll);
PublicRouter.get("/product", ProductController.findAll);

module.exports = PublicRouter;
