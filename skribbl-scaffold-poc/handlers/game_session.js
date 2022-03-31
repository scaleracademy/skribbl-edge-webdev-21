const LiveGamesService = require('../services/live_games_service');
const GameSessionService = require('../services/game_session_service');

function join(player, name, sessionId) {
  player.setName(name);
  const gameSession = LiveGamesService.findGame(sessionId);
  gameSession.addPlayer(player);
}

function chatAndGuess(player, message) {
  const gameSession = LiveGamesService.findGame(player.activeGame.sessionId);
  const gameSessionService = new GameSessionService(gameSession);
  gameSessionService.playerGuess(player, message);
}

module.exports = {
  join,
  chatAndGuess
}
