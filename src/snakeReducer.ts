import {Dictionary, Tuple} from "./Models";

const {random, floor} = Math;

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
export type SnakeReducerAction = Direction | 'TICK';
export type SnakeReducerDispatcher = (action: SnakeReducerAction) => void;

export const TICK: SnakeReducerAction = 'TICK';
export const UP: Direction = 'UP';
export const RIGHT: Direction = 'RIGHT';
export const DOWN: Direction = 'DOWN';
export const LEFT: Direction = 'LEFT';

export type SnakeReducerState = {
    body: Tuple<number>[];
    direction: Direction;
    intent: Direction;
    apple: Tuple<number>;
    gridSize: number;
    crash: boolean;
    ended: boolean;
    ticks: number;
    points: number,
}
export const snakeReducerDefaultState: SnakeReducerState = {
    body: [[2, 0], [1, 0], [0, 0]],
    direction: RIGHT,
    intent: RIGHT,
    apple: [7, 0],
    crash: false,
    gridSize: 30,
    ended: false,
    ticks: 0,
    points: 0,
};

const movementList: Direction[] = [UP, RIGHT, DOWN, LEFT];

export const movements: Dictionary<Tuple<number>> = {
    [UP]: [0, -1],
    [RIGHT]: [1, 0],
    [DOWN]: [0, 1],
    [LEFT]: [-1, 0],
};

export const cellEquals = (a: Tuple<number>, b: Tuple<number>): boolean => {
    return a[0] === b[0] && a[1] === b[1];
};

export const createApple = (body: Tuple<number>[], gridSize: number): Tuple<number> => {
    let apple: Tuple<number>;
    if(body.length === gridSize ** 2) {
        return [-1, -1];
    }
    const appleOverlapsWithSnake = () => body.some(cell => cellEquals(cell, apple));
    do {
        apple = [floor(gridSize *random()), floor(gridSize *random())]
    } while(appleOverlapsWithSnake());
    return apple;
};

const isCrash = (body: Tuple<number>[]): boolean => {
  const set = new Set(body.map(([x, y]) => `${x}-${y}`));
  return set.size !== body.length;
};

export const canTurn = (direction: Direction, intent: Direction): boolean => {
    const directionIndex = movementList.indexOf(direction);
    const intentIndex = movementList.indexOf(intent);
    const [minIndex, maxIndex] = [directionIndex, intentIndex].sort();
    return maxIndex - minIndex <= 1 || (minIndex === 0 && maxIndex === movementList.length - 1);
};

export const rotateCoordinatesToFit = (body: Tuple<number>[], gridSize: number): Tuple<number>[] => {
    return body.map((cell) => cell
        .map(n => n % gridSize)
        .map(n => n < 0 ? gridSize + n : n) as Tuple<number>
    );
};

export const gridFilled = (body: Tuple<number>[], gridSize: number): boolean => {
    return gridSize**2 === body.length;
};

export default function snakeReducer(state: SnakeReducerState, action: SnakeReducerAction): SnakeReducerState {
    switch(action) {
        case TICK: {
            let {intent, body, apple, gridSize, ended, ticks, points} = state;
            if(ended) return state;
            const [[x, y], ...rest] = state.body;
            const [intentX, intentY] = movements[intent];
            let head: Tuple<number> = [x + intentX, y + intentY];
            body = [head, [x, y], ...rest];
            body = rotateCoordinatesToFit(body, gridSize);
            if(cellEquals(body[0], apple)) {
                points++;
                apple = createApple(body, gridSize);
            } else {
                body.pop();
            }
            ended = isCrash(body) || gridFilled(body, gridSize);
            return {
                ...state,
                body,
                apple,
                ended,
                direction: intent,
                ticks: ticks + 1,
                points,
            }
        }
        case UP:
        case RIGHT:
        case DOWN:
        case LEFT: {
            const {direction} = state;
            if(canTurn(direction, action)) {
                return {...state, intent: action};
            }
            return state;
        }
    }
    throw Error(`Invalid action ${action}`);
};