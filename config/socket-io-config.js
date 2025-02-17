const { Server } = require("socket.io");
let io;

function init(server) {
  io = new Server(server);
  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { init, getIO };
