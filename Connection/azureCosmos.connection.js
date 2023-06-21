const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: require("find-config")(".env") });

const azureCosmosConnection = async () => {
  try {
    const connUri = process.env.AZURE_CONNECTION_STRING;
    const client = new MongoClient(connUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const database = client.db("social");
    const collection = database.collection("socialCollection");
    console.log("Connected to Azure Cosmos DB");
  } catch (error) {
    console.log("Error connecting to Azure Cosmos DB:", error);
  }
};

module.exports = {
  azureCosmosConnection,
};
