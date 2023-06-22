const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const keys = require("./Configuration/keys.config");
const User = require("./Model/user.model");
const UserTwitterModel = require("./Model/UserTwitter.model");
const UserFacebookModel = require("./Model/Userfacebook.model");
const authRoutes = require("./Routes/googleAuth.router");
const twitterAuthRoutes = require("./Routes/twitterAuth.router");
const facebookAuthRoutes = require("./Routes/facebookAuth.router");
const githubRoutes = require("./Routes/githubAuth.router");
const ProtectedRoutes = require("./Routes/protectedRoutes.router");
require("dotenv").config({ path: require("find-config")(".env") });
const session = require("express-session");
const UserGithubModel = require("./Model/UserGithub.model");

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
    async (req, accessToken, refreshToken, profile, done) => {
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
    async (req, token, tokenSecret, profile, done) => {
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

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.faceBookKey.clientID,
      clientSecret: keys.faceBookKey.clientSecret,
      callbackURL: keys.faceBookKey.callbackURL,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserFacebookModel.findOne({ facebookId: profile.id });
        if (!user) {
          const newUser = new UserFacebookModel({
            facebookId: profile.id,
            FaceBookUserName: profile.displayName,
            Gender: profile.gender,
          });
          console.log(newUser);
          await newUser.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubKey.clientID,
      clientSecret: keys.githubKey.clientSecret,
      callbackURL: keys.githubKey.callbackURL,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserGithubModel.findOne({ GithubId: profile.id });
        if (!user) {
          const newUser = new UserGithubModel({
            GithubId: profile.id,
            GithubUsername: profile.username,
            Type: profile._json.type,
            Portfolio: profile._json.blog,
            PublicRepos: profile._json.public_repos,
            Followers: profile._json.followers,
            Following: profile._json.following,
          });
          console.log(newUser);
          await newUser.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use("/auth", twitterAuthRoutes);
app.use("/auth", facebookAuthRoutes);
app.use("/auth", ProtectedRoutes);
app.use("/auth", githubRoutes);

app.listen("3002", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running");
  }
});
