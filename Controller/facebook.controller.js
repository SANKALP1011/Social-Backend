const express = require("express");
const passport = require("passport");

module.exports = {
  facebookAuth: passport.authenticate("facebook"),
  facebookAuthCallback: passport.authenticate("facebook", {
    successRedirect: "/auth/protectedRoutes",
    failureRedirect: "/login",
  }),
};
