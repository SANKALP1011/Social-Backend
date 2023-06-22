const passport = require("passport");

module.exports = {
  twitterAuth: passport.authenticate("twitter", {
    scope: ["email", "profile"],
  }),
  twitterAuthCallback: passport.authenticate("twitter", {
    successRedirect: "/auth/protectedRoutes",
    failureRedirect: "/login",
  }),
};
