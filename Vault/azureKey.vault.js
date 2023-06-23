const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
require("dotenv").config({ path: require("find-config")(".env") });
const keys = require("../Configuration/keys.config");

module.exports = {
  saveKeysToAzureVault: async () => {
    const vault = process.env.VAULT_NAME;
    const vaultUrl = process.env.VAULT_URL;
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(vaultUrl, credential);
    for (const [key, value] of Object.entries(keys)) {
      const secretName = key;
      const secretValue = JSON.stringify(value);

      await client.setSecret(secretName, secretValue);
      console.log(`Secret '${secretName}' saved to Azure Key Vault.`);
    }
    saveSecretsToKeyVault().catch((err) => {
      console.error("Error saving secrets to Azure Key Vault:", err);
    });
  },
};
