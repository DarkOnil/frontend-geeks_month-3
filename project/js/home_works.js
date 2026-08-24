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
const parentBlock = document.querySelector(".parent_block");

let x = 0;
let y = 0;
let direction = "right";

function moveBlock() {
    const maxX = parentBlock.clientWidth - childBlock.clientWidth;
    const maxY = parentBlock.clientHeight - childBlock.clientHeight;

    if (direction === "right") {
        x++;

        if (x >= maxX) {
            x = maxX;
            direction = "down";
        }
    }

    if (direction === "down") {
        y++;

        if (y >= maxY) {
            y = maxY;
            direction = "left";
        }
    }

    if (direction === "left") {
        x--;

        if (x <= 0) {
            x = 0;
            direction = "up";
        }
    }

    if (direction === "up") {
        y--;

        if (y <= 0) {
            y = 0;
            direction = "right";
        }
    }

    childBlock.style.left = `${x}px`;
    childBlock.style.top = `${y}px`;

    requestAnimationFrame(moveBlock);
}

moveBlock();

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

// ===== DZ 1: ЗАПРОС НА СПИСОК ПЕРСОНАЖЕЙ (JSON) =====

const charactersList = document.querySelector(".characters-list");

const charactersRequest = new XMLHttpRequest();

charactersRequest.open("GET", "../data/characters.json");
charactersRequest.send();

charactersRequest.onload = () => {
    const characters = JSON.parse(charactersRequest.response);

    characters.forEach(character => {
        charactersList.innerHTML += `
            <div class="character-card">
                <div class="character-photo">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <h3>${character.name}</h3>
                <p>Возраст: ${character.age}</p>
            </div>
        `;
    });
};

charactersRequest.onerror = () => {
    console.error("Не удалось загрузить characters.json");
};


// ===== DZ 2: ЗАПРОС НА JSON ФАЙЛ (ANY) =====

const anyDataRequest = new XMLHttpRequest();

anyDataRequest.open("GET", "../data/azamat.json");
anyDataRequest.send();

anyDataRequest.onload = () => {
    const data = JSON.parse(anyDataRequest.response);

    console.log(data);
};

anyDataRequest.onerror = () => {
    console.error("Не удалось загрузить azamat.json");
};

// ===== DZ 3: ЗАПРОС НА API (fetch) =====

const getPostsButton = document.querySelector("#get-posts");

function getPosts(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(() => console.error(`Не удалось загрузить ${url}`));
}

getPostsButton.addEventListener("click", () => {
    getPosts("https://jsonplaceholder.typicode.com/posts");
});