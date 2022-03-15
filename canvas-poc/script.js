const canvas = document.querySelector("#drawing-area");

let drawing = false;
let eraser = false;
let defaultStyle = 'rgb(255, 255, 255)';
let startX, startY, currentX, currentY;

let ctx = canvas.getContext('2d');
ctx.fillStyle = defaultStyle;

canvas.addEventListener('mousedown', e => {
  startX = e.offsetX;
  startY = e.offsetY;
  drawing = true;
});

canvas.addEventListener('mousemove', e => {
  currentX = e.offsetX;
  currentY = e.offsetY;

  if (drawing) {
    if (eraser) {
      ctx.fillStyle = defaultStyle;
      ctx.fillRect(currentX, currentY, 20, 20);
    } else {
      ctx.fillStyle = 'rgb(0, 0, 255)';

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

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