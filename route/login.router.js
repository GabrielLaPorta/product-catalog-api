const express = require("express");
const {UserController} = require("../controller");

const LoginRouter = express.Router();

LoginRouter.post("/login", (req, res, next) => {
  UserController.login(req, res, next);
});

module.exports = LoginRouter;
