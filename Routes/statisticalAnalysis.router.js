const express = require("express");
const AnalysisRouter = express.Router();
const {
  performStatisticalAnalysis,
} = require("../Controller/statisticalAnaylysis.controller");

AnalysisRouter.get("/getAnalysisData", performStatisticalAnalysis);

module.exports = AnalysisRouter;
