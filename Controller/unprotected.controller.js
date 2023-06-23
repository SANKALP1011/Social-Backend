const express = require("express");

module.exports = {
  unProtectedController: async (req, res) => {
    return res
      .status(200)
      .json({
        Message:
          "This is unprotected route which would handle the redirection issue if the user is not logged in using Google , Facebook , Twitter and facebook",
      });
  },
};
