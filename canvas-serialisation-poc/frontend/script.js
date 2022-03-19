const canvas = document.querySelector("#drawing-area");

let drawing = false;
let eraser = false;
let defaultStyle = 'rgb(255, 255, 255)';
let startX, startY;

let ctx = canvas.getContext('2d');
ctx.fillStyle = defaultStyle;

const socket = io("http://localhost:3000");

function eraseOnCanvas(currentX, currentY) {
  ctx.fillStyle = defaultStyle;
  ctx.fillRect(currentX, currentY, 20, 20);
}

function drawOnCanvas(startX, startY, currentX, currentY) {
  ctx.fillStyle = 'rgb(0, 0, 255)';

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
}

socket.on("connect", () => {
  console.log("connected to backend")
})
socket.on("draw/command", (commands) => {
  commands.forEach(command => {
    if (command[0] == 0) /* drawing */ {
      console.log("drawing")
      drawOnCanvas(command[1], command[2], command[3], command[4])
    } else if (command[0] == 1) /* erasing */ {
      eraseOnCanvas(command[3], command[4])
    }
  })
})

let batch = []
let isRequestTimed = false

function sendDrawCommand(command, currentX, currentY) {
  batch.push([command, startX, startY, currentX, currentY])
  if (!isRequestTimed) {
    setTimeout(() => {
      socket.emit("draw/command", batch);
      isRequestTimed = false
      batch = []
    }, 50);
    isRequestTimed = true
  } 
}

canvas.addEventListener('mousedown', e => {
  startX = e.offsetX;
  startY = e.offsetY;
  drawing = true;
});

canvas.addEventListener('mousemove', e => {
  const currentX = e.offsetX;
  const currentY = e.offsetY;

  if (drawing) {
    if (eraser) {
      eraseOnCanvas(currentX, currentY)
      sendDrawCommand(1, currentX, currentY)
    } else {
      drawOnCanvas(startX, startY, currentX, currentY)
      sendDrawCommand(0, currentX, currentY)

      startX = currentX;
      startY = currentY;
    }
  }
});

canvas.addEventListener('mouseup', e => {
  drawing = false;
});

const toggleEraser = () => {
  eraser = true
}

const selectPen = () => {
  eraser = false
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  eraser = false;
}