const { instrument } = require("@socket.io/admin-ui")

const io = require("socket.io")(3000, {
  cors: {
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:5500",
      "https://admin.socket.io"
    ]
  }
})

io.on('connection', socket => {
  console.log(socket.id)

  socket.on("draw/command", (commands) => {
    console.log(commands)
    socket.broadcast.emit("draw/command", commands)
  })
})

instrument(io, {
  auth: false
})