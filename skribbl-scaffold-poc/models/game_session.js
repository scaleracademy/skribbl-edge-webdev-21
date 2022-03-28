const { v4 } = require('uuid');

class GameSession {
  constructor() {
    this.sessionId = v4();
    this.players = [];
    this.drawer = null;
    
    this._playedRounds = 0;
    this._currentRoundId = null;
    this._currentWord = null;
    this._scoreboard = {};
    this._nextDrawerIndex = 0;
  }

  // DO NOT call mutations directly in the handler
  // Use the service to run the side effects

  get currentWord() {
    return this._currentWord;
  }
  
  get playedRounds() {
    return this._playedRounds;
  }

  addPlayer(player) {
    this.players.push(player);
    this._scoreboard[player.playerId] = {
      points: 0,
      roundScores: {}
    }

    player.socket.join(this.sessionId);
  }

  roundStart() {
    if (this.players.length >= 2) {
      this.drawer = this.players[this._nextDrawerIndex];

      this._playedRounds += 1;
      this._currentRoundId = v4();
      this._currentWord = "something";
      this._nextDrawerIndex = (this._nextDrawerIndex + 1) % this.players.length;
    }
  }

  roundEnd() {
    this._currentRoundId = null;
  }

  playerMakesAGuess(player, guess) {
    if (this._scoreboard[player.playerId].roundScores[this._currentRoundId]) {
      return true
    }

    if (this._currentRoundId && guess === this._currentWord) {
      const gainedPoints = 10;
      const scoreboard = this._scoreboard[player.playerId];
      
      scoreboard.points += gainedPoints;
      scoreboard.roundScores[this._currentRoundId] = gainedPoints;

      return true;
    }

    return false;
  }
}

module.exports = GameSession
