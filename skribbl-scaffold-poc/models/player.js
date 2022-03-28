const { v4 } = require('uuid');

class Player {
  constructor(socket, name) {
    this.playerId = v4();
    this.socket = socket;
    this.name = name;

    this.socket.join(this.playerId);
  }
}

module.exports = Player;
