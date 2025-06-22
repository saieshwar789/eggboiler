// script.js

// --- Get visual elements from the HTML ---
const timerDisplay = document.getElementById('timer-display');
const startTimeDisplay = document.getElementById('start-time-display');
const eggContainer = document.getElementById('egg-container');
const timerButtons = document.querySelectorAll('.timer-button');
const resetButton = document.getElementById('reset-button');

// --- Get audio elements from the HTML ---
const boilingSound = document.getElementById('boiling-sound');
const alarmSound = document.getElementById('alarm-sound');

// --- Timer variables ---
let countdown;
let timeRemaining;
let isAudioUnlocked = false;

/**
 * This function is called ONLY ONCE on the first click.
 * It plays and immediately pauses both sounds. This is a necessary
 * trick to get around strict browser autoplay policies.
 */
function unlockAudio() {
    if (isAudioUnlocked) return;
    
    // A silent play-and-pause "unlocks" the audio for the page
    boilingSound.play();
    boilingSound.pause();
    alarmSound.play();
    alarmSound.pause();

    isAudioUnlocked = true;
    console.log("Audio Unlocked");
}

function startTimer(seconds) {
    clearInterval(countdown);
    stopSounds();

    boilingSound.play();

    timeRemaining = seconds;
    eggContainer.classList.add('boiling');

    const now = new Date();
    const startTimeText = `Boiling started at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    startTimeDisplay.textContent = startTimeText;

    countdown = setInterval(() => {
        timeRemaining--;
        displayTimeLeft(timeRemaining);

        if (timeRemaining <= 0) {
            finishTimer();
        }
    }, 1000);
    
    displayTimeLeft(timeRemaining);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
    
    timerDisplay.textContent = display;
    document.title = `${display} - Egg Timer`;
}

function finishTimer() {
    clearInterval(countdown);
    stopSounds();
    alarmSound.play();
    eggContainer.classList.remove('boiling');
    timerDisplay.textContent = "Done!";
    document.title = "Your egg is ready!";
}

function resetTimer() {
    clearInterval(countdown);
    stopSounds();
    eggContainer.classList.remove('boiling');
    timerDisplay.textContent = "00:00";
    startTimeDisplay.textContent = "";
    document.title = "The Perfect Egg Timer";
}

function stopSounds() {
    boilingSound.pause();
    boilingSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// --- Event Listeners ---
timerButtons.forEach(button => {
    button.addEventListener('click', () => {
        // On the very first click, we must unlock the audio.
        if (!isAudioUnlocked) {
            unlockAudio();
        }
        const time = parseInt(button.dataset.time);
        startTimer(time);
    });
});

resetButton.addEventListener('click', resetTimer);
