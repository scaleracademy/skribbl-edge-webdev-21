const GameSession = require('../models/game_session');

class LiveGamesService {
  _LIVE_GAMES = {}

  createGame() {
    const gameSession = new GameSession();
    this._LIVE_GAMES[gameSession.sessionId] = gameSession;

    return gameSession
  }

  findGame(sessionId) {
    return this._LIVE_GAMES[sessionId];
  }
}

module.exports = new LiveGamesService();
