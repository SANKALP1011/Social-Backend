const express = require("express");
const passport = require("passport");

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});
exports.googleAuthCallback = passport.authenticate("google", {
  successRedirect: "/protectedRoutes",
  failureRedirect: "/login",
});

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};
