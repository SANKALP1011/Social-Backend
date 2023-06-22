const express = require("express");
const passport = require("passport");

module.exports = {
  githubAuth: passport.authenticate("github", { scope: ["user:email"] }),
  githubAuthCallback: passport.authenticate("github", {
    successRedirect: "/auth/protectedRoutes",
    failureRedirect: "/login",
  }),
};
