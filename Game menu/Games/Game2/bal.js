const menu = document.getElementById("Menu");
const MofR = document.getElementById("MofR");
const game = document.getElementById("gameCanvas");
const naam = document.getElementById("naam");
const terug1 = document.getElementById("terug");
const naaminvoer2 = document.getElementById("naam2")

let score1 = 0;
let score2 = 0;

let speler1 = "";
let speler2 = "";

let balX = 50;
let balY = 50;

let balSnelheidX = 4;
let balSnelheidY = 8;

let peddle1Up = false;
let peddle1Down = false;
let peddle2Up = false;
let peddle2Down = false;

let peddle1X = 0;
let peddle2X = 785;
let peddle1Y = 0;
let peddle2Y = 0;

let snelheid = 12;

let paddleWidth = 15;
let paddleHeight = 70;

let robot = true;
let animatieID;

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let radius = 10;

let vorigeTijd = 0;

const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function bot() {
    robot = true;
    naam.classList.remove("hide");
    naam.classList.add("show");
    MofR.classList.remove("show");
    MofR.classList.add("hide");
    terug1.classList.remove("hide")
    terug1.classList.add("show")
    naaminvoer2.value = "Robot"
    naaminvoer2.disabled = true;
}

function human() {
    robot = false;
    naam.classList.remove("hide");
    naam.classList.add("show");
    MofR.classList.remove("show");
    MofR.classList.add("hide");
    terug1.classList.remove("hide")
    terug1.classList.add("show")
    naaminvoer2.disabled = false;
}

function start(){
    menu.classList.remove("show");
    menu.classList.add("hide");
    MofR.classList.remove("hide");
    MofR.classList.add("show");
}

function terug() {
    cancelAnimationFrame(animatieID);
    robot = false;
    game.classList.remove("show");
    game.classList.add("hide");
    menu.classList.remove("hide");
    menu.classList.add("show");
    terug1.classList.remove("show")
    terug1.classList.add("hide")
    naaminvoer2.disabled = false;
    naaminvoer2.value = "" 
    scoreboard.classList.remove("show");
    scoreboard.classList.add("hide");
    naam.classList.remove("show")
    naam.classList.add("hide")
    score1 = 0;
    score2 = 0;
    balSnelheidX = 4;
    balSnelheidY = 8;
    document.getElementById("touchControls").classList.add("hide");
}

function start2() {
    speler1 = document.getElementById("naam1").value
    speler2 = document.getElementById("naam2").value

    if (!speler1) {
        speler1 = "Speler1"
    }
    if (!speler2) {
        speler2 = "Speler2"
    }

    document.getElementById("speler1Naam").textContent = speler1;
    document.getElementById("speler2Naam").textContent = speler2;

    const scoreboard = document.getElementById("scoreboard");
    scoreboard.classList.remove("hide");
    scoreboard.classList.add("show");

    game.classList.remove("hide")
    game.classList.add("show")

    naam.classList.remove("show")
    naam.classList.add("hide")

    requestAnimationFrame(update);
    document.getElementById("touchControls").classList.remove("hide");
}

function update(timestamp) {
    if (!vorigeTijd) vorigeTijd = timestamp;
    const delta = timestamp - vorigeTijd;
    if (delta >= frameInterval) {
        vorigeTijd = timestamp - (delta % frameInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(score1, canvas.width / 4, 50);
        ctx.fillText(score2, canvas.width * 3/4, 50);

        balX = balX + balSnelheidX 
        balY = balY + balSnelheidY

        if (balX - radius <= peddle1X + paddleWidth && balY + radius >= peddle1Y && balY - radius <= peddle1Y + paddleHeight) {
            balSnelheidX = -balSnelheidX;
            balSnelheidX += 1;
        }
        if (balX + radius >= peddle2X && balY + radius >= peddle2Y && balY - radius <= peddle2Y + paddleHeight) {
            balSnelheidX = -balSnelheidX;
            balSnelheidX -= 1;
        }

        if (balX - radius <= 0) {
            score2 += 1;
            resetBal();
        }

        if (balX + radius >= canvas.width) {
            score1 += 1;
            resetBal();
        }

        ctx.beginPath();
        ctx.arc(balX, balY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

        if (balY - radius <= 0) {
            balSnelheidY = -balSnelheidY;
        }
        else if (balY + radius >= canvas.height ) {
            balSnelheidY = -balSnelheidY;
        }

        if (balX - radius <= 0) {
            balSnelheidX = -balSnelheidX;
        }
        else if (balX + radius >= canvas.width) {
            balSnelheidX = -balSnelheidX;
        }

        if(peddle1Up && peddle1Y > 0) {
            peddle1Y -= snelheid;
        }
        if (peddle1Down && peddle1Y < canvas.height - paddleHeight) {
            peddle1Y += snelheid;
        }
        if(peddle2Up && peddle2Y > 0) {
            peddle2Y -= snelheid;
        }
        if (peddle2Down && peddle2Y < canvas.height - paddleHeight) {
            peddle2Y += snelheid;
        }

        ctx.beginPath();
        ctx.rect(peddle1X, peddle1Y, paddleWidth, paddleHeight);
        ctx.fillStyle = "white";
        ctx.fill()
        ctx.closePath()

        if (robot === false) {
            ctx.beginPath();
            ctx.rect(peddle2X, peddle2Y, paddleWidth, paddleHeight);
            ctx.fillStyle = "white";
            ctx.fill()
            ctx.closePath()
        }
        else {
            peddle2Y = balY;
            ctx.beginPath();
            ctx.rect(peddle2X, peddle2Y, paddleWidth, paddleHeight);
            ctx.fillStyle = "white";
            ctx.fill()
            ctx.closePath()
        }
    }

    animatieID = requestAnimationFrame(update);
}

document.addEventListener("keydown", function(event) {
    const active = document.activeElement.tagName === "INPUT";
    if(!active) {
        if(["ArrowUp","ArrowDown","w","s"].includes(event.key)) {
            event.preventDefault();
        }
        if(event.key === "w") peddle1Up = true;
        if(event.key === "s") peddle1Down = true;
        if(event.key === "ArrowUp" && robot === false) peddle2Up = true;
        if(event.key === "ArrowDown" && robot === false) peddle2Down = true;
    }
});

document.addEventListener("keyup", function(event) {
    const active = document.activeElement.tagName === "INPUT";
    if(!active) {
        if(event.key === "w") peddle1Up = false;
        if(event.key === "s") peddle1Down = false;
        if(event.key === "ArrowUp" && robot === false) peddle2Up = false;
        if(event.key === "ArrowDown" && robot === false) peddle2Down = false;
    }
});

function resetBal() {
    balSnelheidX = 4;
    balSnelheidY = 8;
    balX = canvas.width / 2;
    balY = canvas.height / 2;
    balSnelheidX = -balSnelheidX
    balSnelheidY = 8 * (Math.random() > 0.5 ? 1 : -1)
}

function p1Up(state) {
    peddle1Up = state;
}
function p1Down(state) {
    peddle1Down = state;
}

function p2Up(state) {
    if (!robot) peddle2Up = state;
}
function p2Down(state) {
    if (!robot) peddle2Down = state;
}

function bindButton(button, onPress, onRelease) {
    button.addEventListener("touchstart", e => {
        e.preventDefault();
        onPress();
    }, { passive: false });

    button.addEventListener("touchend", e => {
        e.preventDefault();
        onRelease();
    });

    button.addEventListener("mousedown", onPress);
    button.addEventListener("mouseup", onRelease);
    button.addEventListener("mouseleave", onRelease);
}

bindButton(
    document.getElementById("p1Up"),
    () => peddle1Up = true,
    () => peddle1Up = false
);

bindButton(
    document.getElementById("p1Down"),
    () => peddle1Down = true,
    () => peddle1Down = false
);

bindButton(
    document.getElementById("p2Up"),
    () => { if (!robot) peddle2Up = true; },
    () => peddle2Up = false
);

bindButton(
    document.getElementById("p2Down"),
    () => { if (!robot) peddle2Down = true; },
    () => peddle2Down = false
);

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
    window.location.href = "../../index.html";
});

backBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    window.location.href = "../../index.html";
}, { passive: false });

