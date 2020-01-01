import {
    canTurn,
    UP,
    RIGHT,
    DOWN,
    LEFT,
    cellEquals,
    createApple,
    rotateCoordinatesToFit,
} from './snakeReducer'
import {range} from "./utils";


describe('snakeReducer tests', () => {
    describe('rotateCoordinatesToFit', () => {
        test('rotate up overflow', () => {
            const [rotated] = rotateCoordinatesToFit([[0, -1]], 5);
            expect(rotated).toEqual([0, 4]);
        });
        test('rotate right overflow', () => {
            const [rotated] = rotateCoordinatesToFit([[5, 0]], 5);
            expect(rotated).toEqual([0, 0]);
        });
        test('rotate down overflow', () => {
            const [rotated] = rotateCoordinatesToFit([[0, 5]], 5);
            expect(rotated).toEqual([0, 0]);
        });
        test('rotate left overflow', () => {
            const [rotated] = rotateCoordinatesToFit([[-1, 0]], 5);
            expect(rotated).toEqual([4, 0]);
        });
    });
    describe('cellEquals', () => {
        test('same cell', () => {
            expect(cellEquals([0, 0], [0, 0])).toBe(true);
        });
        test('different x axis ', () => {
            expect(cellEquals([0, 0], [1, 0])).toBe(false);
        });
        test('different y axis ', () => {
            expect(cellEquals([0, 0], [0, 1])).toBe(false);
        });
    });
    describe('canTurn', () => {
        test('can turn to same direction already facing ', () => {
            expect(canTurn(UP, UP)).toBe(true);
            expect(canTurn(RIGHT, RIGHT)).toBe(true);
            expect(canTurn(DOWN, DOWN)).toBe(true);
            expect(canTurn(LEFT, LEFT)).toBe(true);
        });
        test('can turn to left ', () => {
            expect(canTurn(UP, LEFT)).toBe(true);
            expect(canTurn(RIGHT, UP)).toBe(true);
            expect(canTurn(DOWN, RIGHT)).toBe(true);
            expect(canTurn(LEFT, DOWN)).toBe(true);
        });
        test('can turn to right', () => {
            expect(canTurn(UP, RIGHT)).toBe(true);
            expect(canTurn(RIGHT, DOWN)).toBe(true);
            expect(canTurn(DOWN, LEFT)).toBe(true);
            expect(canTurn(LEFT, UP)).toBe(true);
        });
        test('cannot turn back', () => {
            expect(canTurn(UP, DOWN)).toBe(false);
            expect(canTurn(RIGHT, LEFT)).toBe(false);
            expect(canTurn(DOWN, UP)).toBe(false);
            expect(canTurn(LEFT, RIGHT)).toBe(false);
        })
    });
    describe('createApple', () => {
        test('can create valid apple to left up corner', () => {
            const created = range(5000).some(() => {
                const [x, y] = createApple([], 5);
                return x === 0 && y === 0;
            });
            expect(created).toBe(true);
        });

        test('can create valid apple to right up corner', () => {
            const created = range(5000).some(() => {
                const [x, y] = createApple([], 5);
                return x === 4 && y === 0;
            });
            expect(created).toBe(true);
        });

        test('can create valid apple to right down corner', () => {
            const created = range(5000).some(() => {
                const [x, y] = createApple([], 5);
                return x === 4 && y === 4;
            });
            expect(created).toBe(true);
        });

        test('can create valid apple to left down corner', () => {
            const created = range(5000).some(() => {
                const [x, y] = createApple([], 5);
                return x === 0 && y === 4;
            });
            expect(created).toBe(true);
        });

        test('never create apple on top of snake', () => {
            const snake = [[1, 2], [2, 2], [3, 2]];
            const clean = range(5000).every(() => {
                const [x, y] = createApple(snake, 5);
                return snake.every(([sX, sY]) => sX !== x || sY !== y);
            });
            expect(clean).toBe(true);
        });

        test('never create apple outside of grid', () => {
            const clean = range(5000).every(() => {
                const [x, y] = createApple([], 5);
                return x >= 0 && x < 5 && y >= 0 && y < 5;
            });
            expect(clean).toBe(true);
        });

        test('never create apple outside of grid', () => {
            const clean = range(5000).every(() => {
                const [x, y] = createApple([], 5);
                return x >= 0 && x < 5 && y >= 0 && y < 5;
            });
            expect(clean).toBe(true);
        });
    });
});

