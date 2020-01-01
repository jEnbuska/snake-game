import {Tuple} from "./Models";

export const range = (to: number): number[] => {
    const acc = [];
    for (let i = 0; i < to ; i++) {
        acc.push(i);
    }
    return acc;
};

export function sortNumbers(a: number, b: number): number {
    return a - b;
}

export function calculateAngles(body: Tuple<number>[], index: number, gridSize = 10): number[] {
    const neighbors = [index-1, index +1]
        .filter(i => i in body)
        .map(i => body[i]);

    const makeRelative = (n: number, target: number) => {
        if(Math.abs(n - target) < 2) {
            return n;
        }
        const maxIndex = gridSize - 1;
        if(n === maxIndex && target === 0) {
            return -1;
        }
        if (n === 0 && target === maxIndex) {
            return gridSize;
        }
        return n;
    };
    const [x, y] = body[index];
    const [xMin = x, xMax = xMin] = neighbors
        .map(it => makeRelative(it[0], x))
        .sort(sortNumbers);
    const [yMin = y, yMax = yMin] = neighbors
        .map(it => makeRelative(it[1], y))
        .sort(sortNumbers);
    return [
        Number((yMin >= y) && (xMin >= x)),
        Number((yMin >= y) && (xMax <= x)),
        Number((yMax <= y) && (xMax <= x)),
        Number((yMax <= y) && (xMin >= x)),
    ];
}