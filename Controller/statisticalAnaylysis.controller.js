const express = require("express");
const User = require("../Model/user.model");
const UserTwitterModel = require("../Model/UserTwitter.model");
const UserFacebookModel = require("../Model/Userfacebook.model");
const UserGithubModel = require("../Model/UserGithub.model");

module.exports = {
  performStatisticalAnalysis: async (req, res) => {
    try {
      const analysisData = {};

      // This will get the number of user from each Indentity Provider
      analysisData.googleUsers = await User.countDocuments({
        googleId: { $ne: "" },
      });
      analysisData.twitterUsers = await UserTwitterModel.countDocuments();
      analysisData.facebookUsers = await UserFacebookModel.countDocuments();
      analysisData.githubUsers = await UserGithubModel.countDocuments();

      // This will help in getting Twitter average Follwoers count
      const twitterFollowers = await UserTwitterModel.find({}, "Follow_Count");
      const totalFollowers = twitterFollowers.reduce(
        (sum, user) => sum + user.Follow_Count,
        0
      );
      analysisData.averageTwitterFollowers =
        totalFollowers / twitterFollowers.length;

      // This will help in getting avg repositpries holded by each user in github
      const githubUsers = await UserGithubModel.find({}, "PublicRepos");
      const totalUsers = githubUsers.length;
      const totalRepositories = githubUsers.reduce(
        (sum, user) => sum + user.PublicRepos,
        0
      );
      analysisData.averageGithubUsers = totalUsers / githubUsers.length;
      analysisData.totalGithubRepositories = totalRepositories;

      // This will helop in getting all the uniaue locations visisted by the user and represt the count
      analysisData.totalDistinctLocations = await UserTwitterModel.distinct(
        "Location"
      ).countDocuments();

      return res.status(200).json(analysisData);
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while performing statistical analysis.",
      });
    }
  },
};
