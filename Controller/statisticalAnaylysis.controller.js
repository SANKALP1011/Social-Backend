const express = require("express");
const User = require("../Model/user.model");
const UserTwitterModel = require("../Model/UserTwitter.model");
const UserFacebookModel = require("../Model/Userfacebook.model");
const UserGithubModel = require("../Model/UserGithub.model");

module.exports = {
  performStatisticalAnalysis: async (req, res) => {
    try {
      const analysisData = {};

      // Number of users from each platform
      analysisData.googleUsers = await User.countDocuments({
        googleId: { $ne: "" },
      });
      analysisData.twitterUsers = await UserTwitterModel.countDocuments();
      analysisData.facebookUsers = await UserFacebookModel.countDocuments();
      analysisData.githubUsers = await UserGithubModel.countDocuments();

      // Twitter user followers on average
      const twitterFollowers = await UserTwitterModel.find({}, "Follow_Count");
      const totalFollowers = twitterFollowers.reduce(
        (sum, user) => sum + user.Follow_Count,
        0
      );
      analysisData.averageTwitterFollowers =
        totalFollowers / twitterFollowers.length;

      // GitHub total users on average and total repositories
      const githubUsers = await UserGithubModel.find({}, "PublicRepos");
      const totalUsers = githubUsers.length;
      const totalRepositories = githubUsers.reduce(
        (sum, user) => sum + user.PublicRepos,
        0
      );
      analysisData.averageGithubUsers = totalUsers / githubUsers.length;
      analysisData.totalGithubRepositories = totalRepositories;

      // Total distinct locations on GitHub
      analysisData.totalDistinctLocations = await UserGithubModel.distinct(
        "Location"
      ).countDocuments();

      return res.status(200).json(analysisData);
    } catch (error) {
      console.error("Error performing statistical analysis:", error);
      return res.status(500).json({
        error: "An error occurred while performing statistical analysis.",
      });
    }
  },
};
