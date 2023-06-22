const express = require("express");
const moongose = require("mongoose");

const UserTwitterModel = new moongose.Schema({
  TwitterId: {
    type: String,
    default: "",
  },
  TwitterDisplayName: {
    type: String,
    default: "",
  },
  Location: {
    type: String,
    default: "",
  },
  TwitterDescription: {
    type: String,
    default: "",
  },
  Follow_Count: {
    type: Number,
    default: 0,
  },
  Friends_Count: {
    type: Number,
    default: 0,
  },
  Favourites_Count: {
    type: Number,
    default: 0,
  },
});

module.exports = moongose.model("twitter", UserTwitterModel);
