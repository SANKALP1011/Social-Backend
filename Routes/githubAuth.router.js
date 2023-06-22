const express = require("express");
const GithubRouter = express.Router();
const GithubController = require("../Controller/github.controller");

GithubRouter.get("/github", GithubController.githubAuth);
GithubRouter.get("/github/callback", GithubController.githubAuthCallback);

module.exports = GithubRouter;
