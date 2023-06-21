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
  FaceBookDisplayName: {
    type: String,
    default: "",
  },
  TwitterDisplayName: {
    type: String,
    default: "",
  },
});

module.exports = moongose.model("user", UserModel);
