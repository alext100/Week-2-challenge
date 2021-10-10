const tableContainer = document.getElementById("table-container");
const startButton = document.querySelector(".buttons-block__start-button");
const newGameButton = document.querySelector(".buttons-block__new-game-button");
const infoSection = document.querySelector(".information");
const rangeInput = document.querySelector(".range-input input");
const rangeValue = document.querySelector(".range-input .value div");

const start = parseFloat(rangeInput.min);
const end = parseFloat(rangeInput.max);
const step = parseFloat(rangeInput.step);

const initialMatriz = Array(30).fill(0).map(() => Array(30).fill(0));

function getNumberOfLivingNeighbors(matriz, i, j) { // Counts the number of neighbors
    let numberOfLivingNeighbors = 0;
    if (matriz[i][j + 1] === 1) { numberOfLivingNeighbors++ }
    if ((j !== 0) && (matriz[i][j - 1] === 1)) { numberOfLivingNeighbors++ }
    if ((i + 1) < matriz.length) {
        if (matriz[i + 1][j] === 1) { numberOfLivingNeighbors++ }
    }
    if ((i + 1) < matriz.length) {
        if (matriz[i + 1][j - 1] === 1) { numberOfLivingNeighbors++ }
    }
    if ((i + 1) < matriz.length) {
        if ((i < matriz[i].length) && (matriz[i + 1][j + 1] === 1)) { numberOfLivingNeighbors++ }
    }
    if ((i !== 0) && (matriz[i - 1][j + 1] === 1)) { numberOfLivingNeighbors++ }
    if ((i !== 0) && (j !== 0) && (matriz[i - 1][j - 1] === 1)) { numberOfLivingNeighbors++ }
    if ((i !== 0) && (matriz[i - 1][j] === 1)) { numberOfLivingNeighbors++ }

    return numberOfLivingNeighbors;
}

function nextGeneration(matriz) { //  Generates a new array according to the rules of the game
    //  const nextGenerationMatriz = [...new Array(30)].map(elem => new Array(30));
    const nextGenerationMatriz = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            const numberOfLivingNeighbors = getNumberOfLivingNeighbors(matriz, i, j);
            if (matriz[i][j] === 1) {
                if (numberOfLivingNeighbors === 2 || numberOfLivingNeighbors === 3) {
                    nextGenerationMatriz[i].push(1);
                } else {
                    nextGenerationMatriz[i].push(0);
                }

            } else if (matriz[i][j] === 0) {
                if (numberOfLivingNeighbors === 3) {
                    nextGenerationMatriz[i].push(1);
                } else nextGenerationMatriz[i].push(0);
            }
        }
    }
    return nextGenerationMatriz;
}

nextGeneration(initialMatriz);

const generateTableFromArray = tableData => { // Generates a table from array elements and displays it in html
    const table = document.createElement('table');
    table.classList.add("table-container__table");
    let row = {};
    let cell = {};

    tableData.forEach((rowData) => {
        row = table.insertRow(-1); // [-1] for last position in Safari
        row.classList.add("table__row")
        rowData.forEach((cellData) => {
            cell = row.insertCell();
            cell.classList.add("table__cell");
            cell.textContent = cellData;
        });
    });
    tableContainer.appendChild(table);
}

generateTableFromArray(nextGeneration(initialMatriz));
let tableCells = document.querySelectorAll(".table__cell");

function changeState() {
    if (this.textContent === '1') {
        this.classList.add("table__cell--died");
        this.classList.remove("table__cell--alive");
        this.textContent = '0';
    } else if (this.textContent === '0') {
        this.classList.add("table__cell--alive");
        this.classList.remove("table__cell--died");
        this.textContent = '1';
    }
}

function createFirstGeneration() { // Allows the user to set the location of living cells on the playing field
    for (const cell of tableCells) {
        cell.addEventListener('click', changeState)
    }
}
createFirstGeneration();

function addClassNameToTableCells() {
    tableCells = document.querySelectorAll(".table__cell");
    for (const cell of tableCells) {
        if (cell.textContent === '1') {
            cell.classList.add("table__cell--alive");
            cell.classList.remove("table__cell--died");
        } else if (cell.textContent === '0') {
            cell.classList.add("table__cell--died");
            cell.classList.remove("table__cell--alive");
        }
    }
}
addClassNameToTableCells();

function convertHtmlTableToArray(tableClassName) { // Generates an array from the html table of live and dead cells on the playing field
    const tableRows = document.querySelector(tableClassName).rows;
    const newArrayFromHtml = [];
    for (let i = 0; i < tableRows.length; i++) {
        const tableCell = tableRows[i].children;
        const arrayElement = [];
        for (let j = 0; j < tableCell.length; j++) {
            arrayElement.push(Number(tableCell[j].innerText));
        }
        newArrayFromHtml.push(arrayElement);
    }
    return newArrayFromHtml;
}

function removeChildNode(domElement) {
    while (domElement.firstChild) {
        domElement.removeChild(domElement.firstChild);
    }
}

function startGame() {
    const newGenerationArray = convertHtmlTableToArray(".table-container__table");
    removeChildNode(tableContainer);
    generateTableFromArray(nextGeneration(newGenerationArray));
    addClassNameToTableCells();
}

function newGame() {
    removeChildNode(tableContainer);
    generateTableFromArray(nextGeneration(initialMatriz));
    addClassNameToTableCells();
    createFirstGeneration();
    removeChildNode(infoSection);
}

function isArraysEqul(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (const i in array1) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            if (!isArraysEqul(array1[i], array2[i])) {
                return false;
            }
        } else if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function reproduceGenerationsAutomatically() {
    let i = 0;
    const timerId = setInterval(() => {
        i++;
        const numberOfGenerations = document.createElement("p");
        removeChildNode(infoSection);
        infoSection.appendChild(numberOfGenerations);
        numberOfGenerations.textContent = `Generacion №: ${i}`;
        startGame();
        if (isArraysEqul(convertHtmlTableToArray(".table-container__table"), nextGeneration(convertHtmlTableToArray(".table-container__table"))) === true) {
            setInterval(() => { clearInterval(timerId); }, 0);
        }
    }, parseFloat(rangeInput.value));
}

newGameButton.addEventListener("click", (event) => {
    if (event.target.nodeName === 'BUTTON') {
        newGame();
    }
});

startButton.addEventListener("click", (event) => {
    if (event.target.nodeName === 'BUTTON') {
        reproduceGenerationsAutomatically();
    }
});

for (let i = start; i <= end; i += step) {
    rangeValue.innerHTML += `<div>${i}</div>`;
}

rangeInput.addEventListener("input", () => {
    const top = parseFloat(rangeInput.value) / step * -40;
    rangeValue.style.marginTop = `${top}px`;
});