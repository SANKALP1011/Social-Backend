// Google Strategy Controller
const passport = require("passport");
const User = require("../Model/user.model");
const UserTwitterModel = require("../Model/UserTwitter.model");
const UserFacebookModel = require("../Model/Userfacebook.model");
const UserGithubModel = require("../Model/UserGithub.model");

module.exports = {
  googleController: async (req, accessToken, refreshToken, profile, done) => {
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
  },
  twitterController: async (req, token, tokenSecret, profile, done) => {
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
  },
  facebookController: async (req, accessToken, refreshToken, profile, done) => {
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
  },
  githubController: async (req, accessToken, refreshToken, profile, done) => {
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
  },
};
