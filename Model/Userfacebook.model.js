const express = require("express");
const moongose = require("mongoose");

const UserFacebookModel = new moongose.Schema({
  facebookId: {
    type: String,
    default: "",
  },
  FaceBookUserName: {
    type: String,
    default: "",
  },
  Gender: {
    type: String,
    default: "",
  },
});

module.exports = moongose.model("facebook", UserFacebookModel);
