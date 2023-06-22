const express = require("express");
const FaceBookRouter = express.Router();
const FacebookController = require("../Controller/facebook.controller");

FaceBookRouter.get("/facebook", FacebookController.facebookAuth);
FaceBookRouter.get(
  "/facebook/callback",
  FacebookController.facebookAuthCallback
);

module.exports = FaceBookRouter;
