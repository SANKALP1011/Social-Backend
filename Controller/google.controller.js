const passport = require("passport");

module.exports = {
  googleAuth: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),

  googleAuthCallback: passport.authenticate("google", {
    successRedirect: "/auth/protectedRoutes",
    failureRedirect: "/login",
  }),

  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/login");
  },
};
