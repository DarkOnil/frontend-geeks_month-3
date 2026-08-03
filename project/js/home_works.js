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

const childBlock = document.querySelector(".child_block");

let position = 0;

const moveBlock = () => {
    position++;
    childBlock.style.left = `${position}px`;

    if (position < 447) {
        requestAnimationFrame(moveBlock);
    }
};

moveBlock();