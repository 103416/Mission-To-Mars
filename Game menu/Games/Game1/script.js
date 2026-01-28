const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

const vierkantgroote = 20;
let vierkantaantal;
let snake = [
    { x: 10, y: 10 }
];

let apple = { x: 5, y: 5 };
let direction = { x: 1, y: 0 };
let growing = false;
let dood = false;

function resizeCanvas() {
    const size = Math.min(window.innerWidth - 40, 400);
    canvas.width = size;
    canvas.height = size;
    vierkantaantal = canvas.width / vierkantgroote;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function start1() {
    function random() {
        apple.x = Math.floor(Math.random() * vierkantaantal);
        apple.y = Math.floor(Math.random() * vierkantaantal);
    }

    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "lime";
        for (let i = 0; i < snake.length; i++) {
            ctx.fillRect(
                snake[i].x * vierkantgroote,
                snake[i].y * vierkantgroote,
                vierkantgroote,
                vierkantgroote
            );
        }

        ctx.fillStyle = "red";
        ctx.fillRect(
            apple.x * vierkantgroote,
            apple.y * vierkantgroote,
            vierkantgroote,
            vierkantgroote
        );
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction.y !== 1) direction = { x: 0, y: -1 };
        if (e.key === "ArrowDown" && direction.y !== -1) direction = { x: 0, y: 1 };
        if (e.key === "ArrowLeft" && direction.x !== 1) direction = { x: -1, y: 0 };
        if (e.key === "ArrowRight" && direction.x !== -1) direction = { x: 1, y: 0 };
    });

    function bewegen() {
        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        snake.unshift(head);

        if (!growing) {
            snake.pop();
        } else {
            growing = false;
        }
    }

    function check() {
        if (snake[0].x === apple.x && snake[0].y === apple.y) {
            growing = true;
            random();
        }
    }

    function gameloop() {
        bewegen();
        check();
        draw();
        raaktzichzelf()
    }

    function dood1() {
            console.log("dood")
            growing = false;
            snake = [
                { x: 10, y: 10 }
            ];
            dood = true
    }

    function raaktzichzelf() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            dood1();
        }
    }
    if (snake[0].x < 0 || snake[0].x >= vierkantaantal || snake[0].y < 0 || snake[0].y >= vierkantaantal) {
        dood1()
    }
}

    if(dood === false ) {
        setInterval(gameloop, 100);
    }
}

function setDirection(x, y) {
    if (x !== 0 && direction.x === -x) return;
    if (y !== 0 && direction.y === -y) return;
    direction = { x, y };
}


function terug() {
    window.location.href = "../../index.html";
}
