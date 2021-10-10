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

describe("Given function isArraysEqul()", () => {
    describe("when it recives an array [ [3, 0, 0, 0, 4], [0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [7, 0, 1, 0, 9]] and an array [ [3, 0, 0, 0, 4], [0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [7, 0, 1, 0, 9]]", () => {
        test("will return true", () => {
            const array1 = [
                [3, 0, 0, 0, 4],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [7, 0, 1, 0, 9]
            ];
            const array2 = [
                [3, 0, 0, 0, 4],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [7, 0, 1, 0, 9]
            ];

            const expected = true;
            const result = isArraysEqul(array1, array2);
            expect(result).toBe(expected)
        });
    });

    describe("when it recives an array ... and an array ...", () => {
        test("will return true", () => {
            const array1 = [
                [3, 0, 5, 0, 4],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [7, 0, 1, 0, 9]
            ];
            const array2 = [
                [3, 0, 0, 0, 4],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [7, 0, 1, 0, 9]
            ];

            const expected = false;
            const result = isArraysEqul(array1, array2);
            expect(result).toBe(expected)
        });
    });
});