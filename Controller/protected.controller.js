const express = require("express");

module.exports = {
  getProtectedData: async (req, res) => {
    return res.status(200).json({
      Message:
        "You are authenticared by the following identity providers which are Google , Github , Twitter , Facebbok . You can get the statistical Analysis by visiting the following endpoint /anaylsis/getAnalysisData",
    });
  },
};
