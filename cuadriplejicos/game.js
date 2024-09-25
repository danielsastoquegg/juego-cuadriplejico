const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let ballX = 50;
let ballY = canvas.height / 2;
let ballSpeed = 0;
let keeperX = canvas.width - 100;
let keeperY = Math.random() * (canvas.height - 50);
const keeperWidth = 50;
const keeperHeight = 50;
let isShooting = false;

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawKeeper() {
    ctx.fillStyle = 'red';
    ctx.fillRect(keeperX, keeperY, keeperWidth, keeperHeight);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawBall();
    drawKeeper();
    if (isShooting) {
        ballX += ballSpeed;
        if (ballX > canvas.width) {
            checkScore();
            resetBall();
        }
    }
}

function resetBall() {
    ballX = 50;
    ballY = canvas.height / 2;
    isShooting = false;
    ballSpeed = 0;
}

function checkScore() {
    // Verificar si el balón pasa al portero
    if (ballY < keeperY || ballY > keeperY + keeperHeight) {
        score++;
        document.getElementById('score').innerText = `Puntos: ${score}`;
    }
    // Reposicionar el portero aleatoriamente
    keeperY = Math.random() * (canvas.height - keeperHeight);
}

function startGame() {
    score = 0;  // Reiniciar puntuación al iniciar
    document.getElementById('score').innerText = `Puntos: ${score}`;
    startRecognition();
    setInterval(update, 100);
}

function startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = function() {
        console.log("Escuchando...");
    };

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Comando recibido: ", command);
        processCommand(command);
    };

    recognition.start();
}

function processCommand(command) {
    if (command.includes('disparar')) {
        isShooting = true;
        ballSpeed = 5;  // Velocidad del balón
    } else if (command.includes('arriba')) {
        ballY = Math.max(0, ballY - 15);
    } else if (command.includes('abajo')) {
        ballY = Math.min(canvas.height, ballY + 15);
    }
}

// Evento para iniciar el juego
document.getElementById('startGame').onclick = startGame;

