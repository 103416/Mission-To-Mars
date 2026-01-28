let kaarten = ["🍎","🍎","🍌","🍌","🍇","🍇","🍒","🍒"];
let knoppen = document.querySelectorAll(".kaart");

let om1 = null;
let om2 = null;

let score1 = 0;
let score2 = 0;
let pl1 = true;
let s1 = document.getElementById("score1");
let s2 = document.getElementById("score2");

let speler = document.getElementById("speler");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function startgame() {
    shuffle(kaarten);
    knoppen.forEach((knop, index) => {
        knop.textContent = kaarten[index];
        knop.classList.add("verborgen");
        knop.disabled = false;
    });
};

startgame();

function check(kaart) {
    if (kaart.disabled) return;
    if (om2 !== null) return;

    kaart.classList.remove("verborgen");

    if (om1 === null) {
        om1 = kaart;
        return;
    }

    if (kaart === om1) return;

    om2 = kaart;

    if (om1.textContent === om2.textContent) {
        om1.disabled = true;
        om2.disabled = true;

        if (pl1) score1 += 1;
        else score2 += 1;

        resetOmgedraaid();
    } else {
        setTimeout(() => {
            om1.classList.add("verborgen");
            om2.classList.add("verborgen");
            resetOmgedraaid();
            pl1 = !pl1;
        }, 800);
    }
};

function resetOmgedraaid() {
    om1 = null;
    om2 = null;
};

function beurt() {
    if (pl1) speler.textContent = "Speler 1 is aan de beurt!";
    else speler.textContent = "Speler 2 is aan de beurt!";
    s1.textContent = score1;
    s2.textContent = score2;

    if ([...knoppen].every(knop => knop.disabled)) {
        opnieuw();
    }
};

function opnieuw() {
    startgame();
    knoppen.forEach(knop => knop.disabled = false);
}

setInterval(beurt, 100);

function terug() {
    window.location.href = "../../index.html";
}
