const { Server } = require("socket.io");

class GameSocket {
  instance = null;

  init(http_server) {
    if (this.instance) {
      return;
    }

    this.instance = new Server(http_server)
  }

  getInstance() {
    return this.instance
  }
}

module.exports = GameSocket
