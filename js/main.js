const gridContainer = document.querySelector('#grid-container');

const easyButton = document.querySelector('#easyButton');
const normalButton = document.querySelector('#normalButton');
const hardButton = document.querySelector('#hardButton');

let bombs = [];
let score = 0;

easyButton.addEventListener('click', function() {
    selectDifficulty('facile');
    score = 0;
});

normalButton.addEventListener('click', function() {
    selectDifficulty('normale');
    score = 0;
});

hardButton.addEventListener('click', function() {
    selectDifficulty('difficile');
    score = 0;
});

function selectDifficulty(difficulty) {
    let gridSize;
    let cellNumber;
    const clickedCells = [];

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
            const cellIndex = i;
            if (clickedCells.includes(cellIndex)) {
                return;
            }
            clickedCells.push(cellIndex); 

            if (bombs.includes(+this.innerHTML)) {
                this.style.backgroundColor = '#FD8A8A'; 
                endGame();
            }
            else {
                score++;
                if (score === gridSize - bombs.length) {
                    endGame();
                }
            }
            this.classList.toggle('active');
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

function endGame() {
    const allCells = document.querySelectorAll('.myCell');
    for (let i = 0; i < allCells.length; i++) {
        const cell = allCells[i];
        cell.onclick = null;
        if (!bombs.includes(parseInt(cell.innerHTML))) {
            cell.style.backgroundColor = '#8294C4'
        }
        else {
            cell.style.backgroundColor = '#FD8A8A';
        }
    }
    alert (`Partita terminata! Il tuo punteggio è ${score}`);
}