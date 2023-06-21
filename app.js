const express = require("express");
const {
  azureCosmosConnection,
} = require("./Connection/azureCosmos.connection");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./Configuration/google.config");
const User = require("./Model/user.model");
const authRoutes = require("./Routes/auth.router");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleKey.clientID,
      clientSecret: keys.googleKey.clientSecret,
      callbackURL: keys.googleKey.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      // Verify the user's credentials and retrieve the user object
      // You can customize this function to query your MongoDB and retrieve/save the user data

      // Example implementation:
      
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          const newUser = new User({
            UserMail: profile.emails[0].value,
            GoogleDisplayName: profile.displayName,
            googleId: profile.id,
          });
          console.log(newUser);
          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

app.use("/auth", authRoutes);

app.listen("3002", async (err) => {
  if (err) {
    console.log(err);
  } else {
    try {
      await azureCosmosConnection();
      console.log("Server running, connected to Azure Cosmos DB");
    } catch (error) {
      console.log("Error connecting to Azure Cosmos DB:", error);
    }
  }
});
