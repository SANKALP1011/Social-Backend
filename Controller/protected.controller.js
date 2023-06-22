const express = require("express");

module.exports = {
  getProtectedData: async (req, res) => {
    return res.status(200).json({ Message: "You are authenticared" });
  },
};
