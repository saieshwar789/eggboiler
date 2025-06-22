// script.js

// --- Get elements from the HTML ---
const timerDisplay = document.getElementById('timer-display');
const eggContainer = document.getElementById('egg-container');
const timerButtons = document.querySelectorAll('.timer-button');
const resetButton = document.getElementById('reset-button');

// --- Timer variables ---
let countdown; // This will hold our setInterval
let timeRemaining; // Time left in seconds
const alarmSound = new Audio('alarm.mp3'); // The alarm sound

// --- Functions ---

// NEW startTimer FUNCTION
function startTimer(seconds) {
    // 1. Clear any existing timers
    clearInterval(countdown);
    
    // --- NEW LINE TO FIX THE SOUND ---
    // This "unlocks" the audio so the browser will let us play it later.
    alarmSound.load();
    // ---------------------------------

    // 2. Set the time and start the "boiling" animation
    timeRemaining = seconds;
    eggContainer.classList.add('boiling');

    // 3. Set up the interval to run every second
    countdown = setInterval(() => {
        timeRemaining--;
        displayTimeLeft(timeRemaining);
        
        // 4. Check if the timer is finished
        if (timeRemaining <= 0) {
            finishTimer();
        }
    }, 1000);
    
    // 5. Display the time immediately, don't wait for the first second
    displayTimeLeft(timeRemaining);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    
    // Format the time to always have two digits (e.g., 01:05)
    const display = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
    
    // Update the timer display and the browser tab title
    timerDisplay.textContent = display;
    document.title = `${display} - Egg Timer`;
}

function finishTimer() {
    clearInterval(countdown);
    eggContainer.classList.remove('boiling');
    timerDisplay.textContent = "Done!";
    document.title = "Your egg is ready!";
    alarmSound.play();
}

function resetTimer() {
    clearInterval(countdown);
    eggContainer.classList.remove('boiling');
    timerDisplay.textContent = "00:00";
    document.title = "The Perfect Egg Timer";
}

// --- Event Listeners ---

// Add a click event to each of the timer option buttons
timerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const time = parseInt(button.dataset.time);
        startTimer(time);
    });
});

// Add a click event to the reset button
resetButton.addEventListener('click', resetTimer);
