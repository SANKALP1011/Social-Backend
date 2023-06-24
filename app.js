const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const { saveKeysToAzureVault } = require("./Vault/azureKey.vault");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const keys = require("./Configuration/keys.config");
const User = require("./Model/user.model");
const UserTwitterModel = require("./Model/UserTwitter.model");
const UserFacebookModel = require("./Model/Userfacebook.model");
const InitialRoute = require("./Routes/initialRouter.router");
const authRoutes = require("./Routes/googleAuth.router");
const twitterAuthRoutes = require("./Routes/twitterAuth.router");
const facebookAuthRoutes = require("./Routes/facebookAuth.router");
const githubRoutes = require("./Routes/githubAuth.router");
const ProtectedRoutes = require("./Routes/protectedRoutes.router");
const UnprotectedRoutes = require("./Routes/unProtectedRoutes.router");
const {
  googleController,
  twitterController,
  facebookController,
  githubController,
} = require("./Controller/passportStartegies.controller");
require("dotenv").config({ path: require("find-config")(".env") });
const session = require("express-session");
const UserGithubModel = require("./Model/UserGithub.model");
const analysisRoutes = require("./Routes/statisticalAnalysis.router");

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleKey.clientID,
      clientSecret: keys.googleKey.clientSecret,
      callbackURL: keys.googleKey.callbackURL,
    },
    googleController
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterKey.consumerKey,
      consumerSecret: keys.twitterKey.consumerSecret,
      callbackURL: keys.twitterKey.callbackURL,
    },
    twitterController
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.faceBookKey.clientID,
      clientSecret: keys.faceBookKey.clientSecret,
      callbackURL: keys.faceBookKey.callbackURL,
    },
    facebookController
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubKey.clientID,
      clientSecret: keys.githubKey.clientSecret,
      callbackURL: keys.githubKey.callbackURL,
    },
    githubController
  )
);

app.use("/", InitialRoute);
app.use(UnprotectedRoutes);
app.use("/auth", authRoutes);
app.use("/auth", twitterAuthRoutes);
app.use("/auth", facebookAuthRoutes);
app.use("/auth", ProtectedRoutes);
app.use("/auth", githubRoutes);
app.use("/anaylsis", analysisRoutes);

app.listen(process.env.PORT || "3002", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running");
  }
});
