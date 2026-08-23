// ========================================
// PRATIKVERSE - COMPLETE SCRIPT
// ========================================


// ========================================
// PYTHON PROJECTS
// ========================================

function openPythonProjects() {
    const modal = document.getElementById("pythonModal");

    if (modal) {
        modal.style.display = "flex";
    }
}

function closePythonProjects() {
    const modal = document.getElementById("pythonModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// Make functions available to HTML onclick
window.openPythonProjects = openPythonProjects;
window.closePythonProjects = closePythonProjects;


// ========================================
// GAME VARIABLES
// ========================================

let targetScore = 0;
let targetTime = 30;
let targetTimer = null;

let snake = [];
let snakeFood = {};

let snakeDirection = "RIGHT";
let nextSnakeDirection = "RIGHT";

let snakeTimer = null;
let snakeScore = 0;

const snakeCell = 20;


// ========================================
// OPEN GAMES
// ========================================

function openGames() {

    const gameModal = document.getElementById("gameModal");

    if (!gameModal) {
        alert("Game window nahi mili!");
        return;
    }

    gameModal.style.display = "flex";

    showGameMenu();
}


// ========================================
// CLOSE GAMES
// ========================================

function closeGames() {

    const gameModal = document.getElementById("gameModal");

    if (gameModal) {
        gameModal.style.display = "none";
    }

    clearInterval(targetTimer);
    targetTimer = null;

    stopSnakeGame();
}


// ========================================
// GAME MENU
// ========================================

function showGameMenu() {

    clearInterval(targetTimer);
    targetTimer = null;

    stopSnakeGame();

    const menu = document.getElementById("gameMenu");
    const targetGame = document.getElementById("targetGame");
    const snakeGame = document.getElementById("snakeGame");

    if (menu) {
        menu.style.display = "grid";
    }

    if (targetGame) {
        targetGame.style.display = "none";
    }

    if (snakeGame) {
        snakeGame.style.display = "none";
    }
}


// Make game functions available to HTML onclick
window.openGames = openGames;
window.closeGames = closeGames;
window.showGameMenu = showGameMenu;


// ========================================
// TARGET CLICKER
// ========================================

function startTargetGameFromMenu() {

    const menu = document.getElementById("gameMenu");
    const targetGame = document.getElementById("targetGame");

    if (!targetGame) {
        alert("Target game nahi mila!");
        return;
    }

    if (menu) {
        menu.style.display = "none";
    }

    targetGame.style.display = "block";

    startTargetGame();
}


function startTargetGame() {

    targetScore = 0;
    targetTime = 30;

    const score = document.getElementById("targetScore");
    const time = document.getElementById("targetTime");

    if (!score || !time) {
        alert("Target game elements nahi mile!");
        return;
    }

    score.textContent = targetScore;
    time.textContent = targetTime;

    clearInterval(targetTimer);

    moveTarget();

    targetTimer = setInterval(function () {

        targetTime--;

        time.textContent = targetTime;

        if (targetTime <= 0) {

            clearInterval(targetTimer);
            targetTimer = null;

            alert(
                "🎯 GAME OVER!\n\nScore: " +
                targetScore
            );
        }

    }, 1000);
}


function moveTarget() {

    const target = document.getElementById("gameTarget");
    const area = document.getElementById("gameArea");

    if (!target || !area) {
        return;
    }

    const maxX = Math.max(
        0,
        area.clientWidth - target.offsetWidth
    );

    const maxY = Math.max(
        0,
        area.clientHeight - target.offsetHeight
    );

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}


function hitTarget() {

    if (targetTime <= 0) {
        return;
    }

    targetScore++;

    const score = document.getElementById("targetScore");

    if (score) {
        score.textContent = targetScore;
    }

    moveTarget();
}


// Target functions available to HTML
window.startTargetGameFromMenu = startTargetGameFromMenu;
window.startTargetGame = startTargetGame;
window.hitTarget = hitTarget;


// ========================================
// SNAKE GAME
// ========================================

function startSnakeGame() {

    const menu = document.getElementById("gameMenu");
    const snakeGame = document.getElementById("snakeGame");

    if (!snakeGame) {
        alert("Snake game nahi mila!");
        return;
    }

    if (menu) {
        menu.style.display = "none";
    }

    snakeGame.style.display = "block";

    restartSnakeGame();
}


function restartSnakeGame() {

    stopSnakeGame();

    snake = [
        {
            x: 200,
            y: 200
        },
        {
            x: 180,
            y: 200
        },
        {
            x: 160,
            y: 200
        }
    ];

    snakeDirection = "RIGHT";
    nextSnakeDirection = "RIGHT";

    snakeScore = 0;

    const score = document.getElementById("snakeScore");

    if (score) {
        score.textContent = snakeScore;
    }

    createSnakeFood();

    drawSnake();

    snakeTimer = setInterval(
        updateSnake,
        120
    );
}


function stopSnakeGame() {

    if (snakeTimer !== null) {

        clearInterval(snakeTimer);

        snakeTimer = null;
    }
}


// ========================================
// CREATE FOOD
// ========================================

function createSnakeFood() {

    const canvas = document.getElementById("snakeCanvas");

    if (!canvas) {
        return;
    }

    const columns = canvas.width / snakeCell;
    const rows = canvas.height / snakeCell;

    let newFood;

    do {

        newFood = {

            x:
                Math.floor(
                    Math.random() * columns
                ) * snakeCell,

            y:
                Math.floor(
                    Math.random() * rows
                ) * snakeCell

        };

    } while (
        snake.some(function (part) {

            return (
                part.x === newFood.x &&
                part.y === newFood.y
            );

        })
    );

    snakeFood = newFood;
}


// ========================================
// DRAW SNAKE
// ========================================

function drawSnake() {

    const canvas = document.getElementById("snakeCanvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#050909";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Grid
    ctx.strokeStyle = "#102a30";
    ctx.lineWidth = 1;

    for (
        let x = 0;
        x <= canvas.width;
        x += snakeCell
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);

        ctx.stroke();
    }


    for (
        let y = 0;
        y <= canvas.height;
        y += snakeCell
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);

        ctx.stroke();
    }


    // Food
    ctx.font = "18px Arial";

    ctx.fillText(
        "🍎",
        snakeFood.x,
        snakeFood.y + 18
    );


    // Snake
    snake.forEach(function (part, index) {

        ctx.fillStyle =
            index === 0
                ? "#00e5ff"
                : "#008fa3";

        ctx.fillRect(
            part.x + 1,
            part.y + 1,
            snakeCell - 2,
            snakeCell - 2
        );

    });
}


// ========================================
// UPDATE SNAKE
// ========================================

function updateSnake() {

    if (!snake.length) {
        return;
    }

    snakeDirection = nextSnakeDirection;

    const head = {
        x: snake[0].x,
        y: snake[0].y
    };


    // Movement
    if (snakeDirection === "UP") {
        head.y -= snakeCell;
    }

    if (snakeDirection === "DOWN") {
        head.y += snakeCell;
    }

    if (snakeDirection === "LEFT") {
        head.x -= snakeCell;
    }

    if (snakeDirection === "RIGHT") {
        head.x += snakeCell;
    }


    const canvas = document.getElementById("snakeCanvas");

    if (!canvas) {
        stopSnakeGame();
        return;
    }


    // Wall collision
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
    ) {

        snakeGameOver();
        return;
    }


    // Self collision
    for (let i = 0; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {

            snakeGameOver();
            return;
        }

    }


    snake.unshift(head);


    // Food collision
    if (
        head.x === snakeFood.x &&
        head.y === snakeFood.y
    ) {

        snakeScore++;

        const score =
            document.getElementById("snakeScore");

        if (score) {
            score.textContent = snakeScore;
        }

        createSnakeFood();

    } else {

        snake.pop();

    }

    drawSnake();
}


// ========================================
// SNAKE GAME OVER
// ========================================

function snakeGameOver() {

    stopSnakeGame();

    alert(
        "🐍 GAME OVER!\n\nScore: " +
        snakeScore
    );
}


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener(
    "keydown",
    function (event) {

        const snakeGame =
            document.getElementById("snakeGame");

        if (
            !snakeGame ||
            snakeGame.style.display === "none"
        ) {
            return;
        }


        if (
            event.key === "ArrowUp" &&
            snakeDirection !== "DOWN"
        ) {

            nextSnakeDirection = "UP";
            event.preventDefault();

        }


        else if (
            event.key === "ArrowDown" &&
            snakeDirection !== "UP"
        ) {

            nextSnakeDirection = "DOWN";
            event.preventDefault();

        }


        else if (
            event.key === "ArrowLeft" &&
            snakeDirection !== "RIGHT"
        ) {

            nextSnakeDirection = "LEFT";
            event.preventDefault();

        }


        else if (
            event.key === "ArrowRight" &&
            snakeDirection !== "LEFT"
        ) {

            nextSnakeDirection = "RIGHT";
            event.preventDefault();

        }

    }
);


// ========================================
// SNAKE FUNCTIONS AVAILABLE TO HTML
// ========================================

window.startSnakeGame = startSnakeGame;
window.restartSnakeGame = restartSnakeGame;
window.stopSnakeGame = stopSnakeGame;


// ========================================
// CLOSE MODALS BY CLICKING OUTSIDE
// ========================================

window.addEventListener(
    "click",
    function (event) {

        const pythonModal =
            document.getElementById("pythonModal");

        const gameModal =
            document.getElementById("gameModal");


        if (
            pythonModal &&
            event.target === pythonModal
        ) {

            closePythonProjects();

        }


        if (
            gameModal &&
            event.target === gameModal
        ) {

            closeGames();

        }

    }
);


// ========================================
// SCRIPT LOADED CHECK
// ========================================

console.log(
    "✅ PRATIKVERSE script.js loaded successfully!"
);