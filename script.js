const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const robotImg = new Image();
robotImg.src = "robot.png"; // Đổi đúng tên ảnh robot

let robot = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 80,
  height: 100,
  speed: 5,
  targetX: null,
  targetY: null
};

function drawRobot() {
  ctx.drawImage(robotImg, robot.x - robot.width / 2, robot.y - robot.height / 2, robot.width, robot.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (robot.targetX !== null && robot.targetY !== null) {
    const dx = robot.targetX - robot.x;
    const dy = robot.targetY - robot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      robot.x += (dx / distance) * robot.speed;
      robot.y += (dy / distance) * robot.speed;
    }
  }

  drawRobot();
  requestAnimationFrame(update);
}

// Nhấp chuột hoặc chạm màn hình
canvas.addEventListener("click", e => {
  robot.targetX = e.clientX;
  robot.targetY = e.clientY;
});
canvas.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  robot.targetX = touch.clientX;
  robot.targetY = touch.clientY;
});

robotImg.onload = () => {
  update();
};
