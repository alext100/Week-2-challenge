/* Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.
At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, asif by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation.Similarly, all other dead cells stay dead.
The initial pattern constitutes the seed of the system.The first generation is created by applying the above rules simultaneously to every 
cell in the seed, live or dead;
births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.Each generation is a pure
function of the preceding one.The rules
continue to be applied repeatedly to create further generations. */

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
    debugger;
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