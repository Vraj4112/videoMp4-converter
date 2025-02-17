const dotenv = require("dotenv");
const fs = require("fs");

const env = process.env.NODE_ENV || "development";
const baseEnvFilePath = `.env.${env}`;
const localEnvFilePath = `${baseEnvFilePath}.local`;

if (fs.existsSync(baseEnvFilePath)) {
  dotenv.config({ path: baseEnvFilePath });
}

if (fs.existsSync(localEnvFilePath)) {
  dotenv.config({ path: localEnvFilePath });
}

console.log(`Loaded environment: ${env}`);
