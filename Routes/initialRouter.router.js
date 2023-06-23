const express = require("express");
const InitialRouter = express.Router();
const { initialController } = require("../Controller/initial.controller");

InitialRouter.get("/", initialController);
module.exports = InitialRouter;
