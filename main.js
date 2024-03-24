let screen = document.querySelector('#my-canvas');
let brush = screen.getContext('2d');
const speedSet = document.querySelector('#speedSet');
const speedOut = document.querySelector('#speedSetOut');
const scoreOut = document.querySelector('#scoreOut');
const eventsOut = document.querySelector('#eventsOut');

let axisX;
let axisY;

let scoreboard = 0;
let events = 0;

let speed;
let intervalID;

function initGame() {
    speed = parseInt(speedSet.value);
    intervalID = setInterval(refreshScreen, speed);
    scoreOut.textContent = scoreboard.toString();
    eventsOut.textContent = events.toString();
}

function drawCircle(x, y, radius, color){
    brush.fillStyle = color;
    brush.beginPath();
    brush.arc(x, y, radius, 0, 2 * Math.PI);
    brush.fill();
}

function cleanScreen() {
    brush.clearRect(0, 0, 600, 400);
}

function refreshScreen() {
    cleanScreen();
    axisX = Math.floor(Math.random() * 540 + 30);
    axisY = Math.floor(Math.random() * 340 + 30);
    drawCircle(axisX, axisY, 30, 'red');
    drawCircle(axisX, axisY, 20, 'white');
    drawCircle(axisX, axisY, 10, 'red');
    events++;
    eventsOut.textContent = events.toString();
}

function getShot(event) {
    let shotX = event.pageX - screen.offsetLeft;
    let shotY = event.pageY - screen.offsetTop;

    let targetX = (axisX > shotX - 10) && (axisX < shotX + 10);
    let targetY = (axisY > shotY - 10) && (axisY < shotY + 10);

    if (targetX && targetY){
        scoreboard++;
        scoreOut.textContent = scoreboard.toString();
    }
}

initGame();

speedOut.textContent = speedSet.value;

screen.onclick = getShot;
speedSet.addEventListener('input', (event) => {
    scoreboard = 0;
    events = 0;
    scoreOut.textContent = scoreboard.toString();
    eventsOut.textContent = events.toString();
    speed = parseInt(speedSet.value);
    clearInterval(intervalID);
    intervalID = setInterval(refreshScreen, speed);
    speedOut.textContent = speedSet.value;
});