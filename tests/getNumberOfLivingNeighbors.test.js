// const { getNumberOfLivingNeighbors, nextGeneration } = require("../src/script");

// import { getNumberOfLivingNeighbors } from "../src/script";

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
    const nextGenerationMatriz = [
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

describe("Given function getNumberOfLivingNeighbors", () => {
    describe("when it recives el array [ [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]];, row number 3 and element number 1 ", () => {
        test("will return number of living neighbors 4", () => {
            const givenArray = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ];
            const rowNumber = 3;
            const elementNumber = 1;

            const expected = 4;

            const result = getNumberOfLivingNeighbors(givenArray, rowNumber, elementNumber);

            expect(result).toBe(expected);
        });
    });
    describe("when it recives el array [ [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]];, row number 1 and element number 3 ", () => {
        test("will return number of living neighbors 2", () => {
            const givenArray = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ];
            const rowNumber = 1;
            const elementNumber = 3;

            const expected = 2;

            const result = getNumberOfLivingNeighbors(givenArray, rowNumber, elementNumber);

            expect(result).toBe(expected);
        });
    });
});

describe("Given functions nextGeneration and getNumberOfLivingNeighbors", () => {
    describe("when they recive el array [ [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]], and from function getNumberOfLivingNeighbors number of neighbors;, ", () => {
        test("will return un nuevo array [ [0, 0, 0, 0, 0], [0, 1, 1, 0, 0], [0, 1, 1, 1, 0], [0, 0, 1, 1, 0], [0, 0, 0, 0, 0]]", () => {
            const givenArray = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ];

            const expected = [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0]
            ];

            const result = nextGeneration(givenArray);

            expect(result).toStrictEqual(expected);
        });
    });
    describe("when it recives el array [ [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], ]", () => {
        test("will return un nuevo array ", () => {
            const givenArray = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],

            ];

            const expected = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ];

            const result = nextGeneration(givenArray);

            expect(result).toStrictEqual(expected);
        });
    });
});