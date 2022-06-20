const express = require("express");
const {UserController} = require("../controller");

const UserRouter = express.Router();

UserRouter.get("/user/:id", (req, res, next) => {
  UserController.findById(req, res, next);
});

UserRouter.get("/user", (req, res, next) => {
  UserController.findAll(req, res, next);
});

UserRouter.post("/user", (req, res, next) => {
  UserController.insert(req, res, next);
});

UserRouter.put("/user/:id", (req, res, next) => {
  UserController.update(req, res, next);
});

UserRouter.delete("/user/:id", (req, res, next) => {
  UserController.delete(req, res, next);
});

module.exports = UserRouter;
