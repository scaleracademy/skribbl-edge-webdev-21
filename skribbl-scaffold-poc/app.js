const Player = require('./models/player');
const { join, chat } = require('./handlers/game_session');
const io = require("socket.io")(3000, {
  cors: {
    origin: [
      "http://localhost:8080",
    ]
  }
})

io.on('connection', socket => {
  const player = new Player(socket)
  socket.on("session/join", (name, sessionId) => join(player, name, sessionId));
  socket.on("session/chat", (message) => chat(player, message));
})
