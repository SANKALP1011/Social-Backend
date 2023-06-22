const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const keys = require("./Configuration/keys.config");
const User = require("./Model/user.model");
const UserTwitterModel = require("./Model/UserTwitter.model");
const authRoutes = require("./Routes/googleAuth.router");
const twitterAuthRoutes = require("./Routes/twitterAuth.router");
const ProtectedRoutes = require("./Routes/protectedRoutes.router");
require("dotenv").config({ path: require("find-config")(".env") });
const session = require("express-session");

mongoose
  .connect(process.env.MONGO_CONN_STRING)
  .then(() => console.log("Database connected"))
  .catch((e) => {
    console.log(e);
  });
mongoose.set("strictQuery", true);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleKey.clientID,
      clientSecret: keys.googleKey.clientSecret,
      callbackURL: keys.googleKey.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
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

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterKey.consumerKey,
      consumerSecret: keys.twitterKey.consumerSecret,
      callbackURL: keys.twitterKey.callbackURL,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await UserTwitterModel.findOne({ TwitterId: profile.id });
        if (!user) {
          const newUser = new UserTwitterModel({
            TwitterId: profile.id,
            TwitterDisplayName: profile.username,
            Location: profile._json.location,
            TwitterDescription: profile._json.description,
            Follow_Count: profile._json.followers_count,
            Friends_Count: profile._json.friends_count,
            Favourites_Count: profile._json.favourites_count,
          });
          console.log(newUser);
          await newUser.save();
        }
        console.log(profile);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/auth", authRoutes);
app.use("/auth", twitterAuthRoutes);
app.use("/auth", ProtectedRoutes);

app.listen("3002", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running");
  }
});
