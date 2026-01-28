const audio = document.getElementById("audio");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const songs = [
    "muziek/1.mp3",
    "muziek/2.mp3",
    "muziek/3.mp3",
    "muziek/4.mp3"
];

let currentSong = 0;

audio.src = songs[currentSong];

nextBtn.addEventListener("click", () => {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    audio.src = songs[currentSong];
    audio.play();
});

prevBtn.addEventListener("click", () => {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    audio.src = songs[currentSong];
    audio.play();
});
