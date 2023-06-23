const express = require("express");
const UnprotectedRouter = express.Router();
const {
  unProtectedController,
} = require("../Controller/unprotected.controller");

UnprotectedRouter.get("/login", unProtectedController);
module.exports = UnprotectedRouter;
