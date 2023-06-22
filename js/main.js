const gridContainer = document.querySelector('#grid-container');

const easyButton = document.querySelector('#easyButton');
const normalButton = document.querySelector('#normalButton');
const hardButton = document.querySelector('#hardButton');

let bombs = [];
let score = 0;

easyButton.addEventListener('click', function() {
    selectDifficulty('facile');
});

normalButton.addEventListener('click', function() {
    selectDifficulty('normale');
});

hardButton.addEventListener('click', function() {
    selectDifficulty('difficile');
});

function selectDifficulty(difficulty) {
    let gridSize;
    let cellNumber;

    switch (difficulty) {
        case 'facile':
            gridSize = 100;
            cellNumber = 'myCell-easy';
            break;
        case 'normale':
            gridSize = 81;
            cellNumber = 'myCell-normal';
            break;
        case 'difficile':
            gridSize = 49;
            cellNumber = 'myCell-hard';
            break;
        default:
            console.log('Difficoltà non valida');
            return;
    }

    bombs = generateBombs(gridSize);

    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    for (let i = 1; i <= gridSize; i++) {
        const mySquare = document.createElement('div');
        mySquare.classList.add('myCell', cellNumber);
        mySquare.append(i);
        mySquare.addEventListener('click', function() {
            if (bombs.includes(+this.innerHTML)) {
                this.style.backgroundColor = 'red'; //aggiungere fine gioco qui
            }
            else {
                score++;
                console.log(score);
            }
            this.classList.toggle('active');
            console.log(this.innerHTML);
        });
    
        gridContainer.append(mySquare);
    
    }
}

function generateBombs(gridSize) {
    const bombs = [];
    while (bombs.length < 16) {
        const randomNumber = Math.floor(Math.random() * gridSize) + 1;
        if (!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        } 
    }
    return bombs;
}