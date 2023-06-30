const express = require("express");

module.exports = {
  getProtectedData: async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
  },
};
