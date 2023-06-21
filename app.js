const express = require("express");
const {
  azureCosmosConnection,
} = require("./Connection/azureCosmos.connection");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./Configuration/google.config");
const User = require("./Model/user.model");
const authRoutes = require("./Routes/googleAuth.router");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleKey.clientID,
      clientSecret: keys.googleKey.clientSecret,
      callbackURL: keys.googleKey.callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = new User({
            UserMail: profile.emails[0].value,
            GoogleDisplayName: profile.displayName,
            googleId: profile.id,
          });
          console.log(newUser);
          user = await newUser.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
