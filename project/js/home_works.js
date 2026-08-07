// Homework 1 (part 1) 

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const gmailRegExp = /^[a-zA-Z0-9._%+-]{3,}@gmail\.com$/;

gmailButton.addEventListener("click", () => {
    if (gmailRegExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "✔";
        gmailResult.style.color = "green";
    } else {
        gmailResult.innerHTML = "✖";
        gmailResult.style.color = "red";
    }
});


//  Homework 1 (part 2) 

let counter = 0;
let timer = null;
let isRunning = false;

const seconds = document.querySelector("#seconds");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    function count() {
        if (!isRunning) return;

        counter++;
        seconds.textContent = counter;

        timer = setTimeout(count, 1000);
    }

    count();
}

startButton.addEventListener("click", startTimer);

stopButton.addEventListener("click", () => {
    isRunning = false;
    clearTimeout(timer);
});

resetButton.addEventListener("click", () => {
    isRunning = false;
    clearTimeout(timer);

    counter = 0;
    seconds.textContent = 0;
});

// Homework 2

let counter = 0;
let interval = null;

const seconds = document.querySelector("#seconds");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

startButton.addEventListener("click", () => {
    if (interval !== null) {
        return;
    }

    interval = setInterval(() => {
        counter++;
        seconds.textContent = counter;
    }, 1000);
});

stopButton.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
});

resetButton.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;

    counter = 0;
    seconds.textContent = counter;
});
