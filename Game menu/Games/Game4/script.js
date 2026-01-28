let v1 = document.getElementById("1");
let v2 = document.getElementById("2");
let v3 = document.getElementById("3");
let v4 = document.getElementById("4");
let v5 = document.getElementById("5");
let v6 = document.getElementById("6");
let v7 = document.getElementById("7");
let v8 = document.getElementById("8");
let v9 = document.getElementById("9");

let allemaal = [v1,v2,v3,v4,v5,v6,v7,v8,v9];

const win = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let beurt = 0;

function check(vakje) {
    if (beurt === 0) {
        vakje.classList.add("X");
        document.getElementById("beurt").innerText = "Speler 2 is aan de beurt";
        beurt = 1;
    } else {
        vakje.classList.add("O");
        document.getElementById("beurt").innerText = "Speler 1 is aan de beurt";
        beurt = 0;
    }

    vakje.disabled = true;
    checkWin();
}

function checkWin() {
    for (let combinate of win) {
        const [a,b,c] = combinate;

        if (allemaal[a].classList.contains("X") && allemaal[b].classList.contains("X") && allemaal[c].classList.contains("X")) {
            alert("X wint!");
            Reset();
        }
        if (allemaal[a].classList.contains("O") && allemaal[b].classList.contains("O") && allemaal[c].classList.contains("O")) {
            alert("O wint!");
            Reset();
        }
    }

    if (allemaal.every(vakje => vakje.disabled)) {
        alert("Gelijkspel!");
        Reset();
    }
}

function Reset() {
    allemaal.forEach(vakje => {
        vakje.classList.remove("X","O");
        vakje.disabled = false;
    });
    beurt = 0;
    document.getElementById("beurt").innerText = "Speler 1 is aan de beurt";
}

function terug() {
    window.location.href = "../../index.html";
}
