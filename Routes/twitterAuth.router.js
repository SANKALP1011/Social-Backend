const express = require("express");
const TwitterRouter = express.Router();
const TwitterController = require("../Controller/twitter.controller");

TwitterRouter.get("/twitter", TwitterController.twitterAuth);
TwitterRouter.get("/twitter/callback", TwitterController.twitterAuthCallback);

module.exports = TwitterRouter;
