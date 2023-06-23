const express = require("express");

module.exports = {
  initialController: async (req, res) => {
    return res.status(200).json({
      "Initial Route Message":
        "Welcome to the social backend which use Oauth identity provider by using passport.js for authenticatio. Please vissit the githun url for the documentation",
    });
  },
};
