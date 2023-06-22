const express = require("express");
const mongoose = require("mongoose");

const UserGithubModel = new mongoose.Schema({
  GithubId: {
    type: String,
    default: "",
  },
  GithubUsername: {
    type: String,
    default: "",
  },
  Type: {
    type: String,
    default: "",
  },
  Portfolio: {
    type: String,
    default: "",
  },
  PublicRepos: {
    type: Number,
    default: 0,
  },
  Followers: {
    type: Number,
    default: 0,
  },
  Following: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("github", UserGithubModel);
