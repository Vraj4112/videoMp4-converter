require("./config/env-config");
require("./src/utilities/services/queueService");

const http = require("http");
const app = require("./config/app-config");
const { init } = require("./config/socket-io-config");
const dbconnect = require("./src/database/connect");

const PORT = process.env.PORT || 3002;

dbconnect();

const server = http.createServer(app);
init(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
