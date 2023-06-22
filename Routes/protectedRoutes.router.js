const express = require("express");
const ProtectedRouter = express.Router();
const { getProtectedData } = require("../Controller/protected.controller");

ProtectedRouter.get("/protectedRoutes", getProtectedData);

module.exports = ProtectedRouter;
