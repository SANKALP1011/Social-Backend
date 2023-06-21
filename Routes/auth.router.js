const express = require("express");
const GoogleRouter = express.Router();
const googleControllert = require("../Controller/google.controller");

GoogleRouter.get("/google", googleControllert.googleAuth);
GoogleRouter.get("/google/callback", googleControllert.googleAuthCallback);
GoogleRouter.get("/google/logout", googleControllert.logout);

module.exports = GoogleRouter;
