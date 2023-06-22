require("dotenv").config({ path: require("find-config")(".env") });

module.exports = {
  googleKey: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/google/callback",
  },
  twitterKey: {
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWIITTER_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/twitter/callback",
  },
};
