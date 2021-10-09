const tableContainer = document.getElementById("table-container");
const startButton = document.querySelector(".buttons-block__start-button");

const initialMatriz = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];

function getNumberOfLivingNeighbors(matriz, i, j) {
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

function nextGeneration(matriz) {
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
console.clear();
nextGeneration(initialMatriz);
console.table(nextGeneration(initialMatriz));

const generateTableFromArray = tableData => {
    const table = document.createElement('table');
    table.classList.add("table-container__table")
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
const tableCells = document.querySelectorAll(".table__cell");

function createFirstGeneration() {
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
    for (const cell of tableCells) {
        cell.addEventListener('click', changeState)
    }
}
createFirstGeneration();

function convertHtmlTableToArray(tableClassName) {
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

startButton.addEventListener("click", (event) => {
    if (event.target.nodeName === 'BUTTON') {
        console.table(convertHtmlTableToArray(".table-container__table"));
    }
})