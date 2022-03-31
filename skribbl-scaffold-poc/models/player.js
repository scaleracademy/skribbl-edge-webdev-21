const { v4 } = require('uuid');

class Player {
  constructor(socket) {
    this.playerId = v4();
    this.socket = socket;
    this.name = null;
    this.activeGame = null;

    this.socket.join(this.playerId);
  }

  setName(name) {
    this.name = name
  }

  setActiveGame(session) {
    this.activeGame = session;
  }
}

module.exports = Player;
