const moongose = require("mongoose");

const UserModel = new moongose.Schema({
  UserMail: {
    type: String,
    default: "",
  },
  GoogleDisplayName: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
    default: "",
  },
  facebookId: {
    type: String,
    default: "",
  },
  twitterId: {
    type: String,
    default: "",
  },
  FaceBookDisplayName: {
    type: String,
    default: "",
  },
  TwitterDisplayName: {
    type: String,
    default: "",
  },
  TwitterLocation: {
    type: "String",
    default: "",
  },
  TwitterDiscription: {
    type: "String",
    default: "",
  },
  TwitterFriendsCount: {
    type: Number,
    default: 0,
  },
  TwitterFollowerCount: {
    type: Number,
    default: 0,
  },
});

module.exports = moongose.model("user", UserModel);
