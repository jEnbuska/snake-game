import { calculateAngles } from './utils'

describe('calculateAngles tests', () => {

    test('no neighbors', () => {
        const angles = calculateAngles([[0, 0]], 0);
        expect(angles).toEqual([1, 1, 1, 1]);
    });

    describe('no angle', () => {
        test('left right', () => {
            const angles = calculateAngles([[0, 0], [1, 0], [2, 0]], 1);
            expect(angles).toEqual([0, 0, 0, 0]);
        });

        test('right left', () => {
            const angles = calculateAngles([[2, 0], [1, 0], [0, 0]], 1);
            expect(angles).toEqual([0, 0, 0, 0]);
        });

        test('up down', () => {
            const angles = calculateAngles([[0, 0], [0, 1], [0, 2]], 1);
            expect(angles).toEqual([0, 0, 0, 0]);
        });

        test('down up', () => {
            const angles = calculateAngles([[0, 2], [0, 1], [0, 0]], 1);
            expect(angles).toEqual([0, 0, 0, 0]);
        });
    });

    describe('right top angle', () => {
        test('left down', () => {
            const angles = calculateAngles([[0, 0], [1, 0], [1, 1]], 1);
            expect(angles).toEqual([0, 1, 0, 0]);
        });

        test('down left', () => {
            const angles = calculateAngles([[1, 1], [1, 0], [0, 0]], 1);
            expect(angles).toEqual([0, 1, 0, 0]);
        });
    });


    describe('right bottom angle', () => {
        test('up left', () => {
            const angles = calculateAngles([[1, 0], [1,1], [0, 1]], 1);
            expect(angles).toEqual([0, 0, 1, 0]);
        });

        test('left up', () => {
            const angles = calculateAngles([[0, 1], [1,1], [1, 0]], 1);
            expect(angles).toEqual([0, 0, 1, 0]);
        })
    });

    describe('left bottom angle', () => {
        test('up right', () => {
            const angles = calculateAngles([[0, 0], [0,1], [1, 1]], 1);
            expect(angles).toEqual([0, 0, 0, 1]);
        });

        test('right up', () => {
            const angles = calculateAngles([[1, 1], [0,1], [0, 0]], 1);
            expect(angles).toEqual([0, 0, 0, 1]);
        })
    });

    describe('left top angle', () => {
        test('bottom right', () => {
            const angles = calculateAngles([[0, 1], [0,0], [1,0]], 1);
            expect(angles).toEqual([1, 0, 0, 0]);
        });

        test('right bottom', () => {
            const angles = calculateAngles([[1, 0], [0,0], [0,1]], 1);
            expect(angles).toEqual([1, 0, 0, 0]);
        });
    });

    describe('head', () => {
        test('down', () => {
            const angles = calculateAngles([[0, 0], [0,1]], 0);
            expect(angles).toEqual([1, 1, 0, 0]);
        });

        test('up', () => {
            const angles = calculateAngles([[0, 1], [0,0]], 0);
            expect(angles).toEqual([0, 0, 1, 1]);
        });

        test('left', () => {
            const angles = calculateAngles([[1, 0], [0,0]], 0);
            expect(angles).toEqual([0, 1, 1, 0]);
        });

        test('right', () => {
            const angles = calculateAngles([[0, 0], [1,0]], 0);
            expect(angles).toEqual([1, 0, 0, 1]);
        });
    });

    describe('tail', () => {
        test('up', () => {
            const angles = calculateAngles([[0, 0], [0,1]], 1);
            expect(angles).toEqual([0, 0, 1, 1]);
        });

        test('down', () => {
            const angles = calculateAngles([[0, 1], [0,0]], 1);
            expect(angles).toEqual([1, 1, 0, 0]);
        });

        test('right', () => {
            const angles = calculateAngles([[1, 0], [0,0]], 1);
            expect(angles).toEqual([1, 0, 0, 1]);
        });

        test('left', () => {
            const angles = calculateAngles([[0, 0], [1,0]], 1);
            expect(angles).toEqual([0, 1, 1, 0]);
        });
    });

    describe('loop over side', () => {
        test('left to right', () => {
            const angles = calculateAngles([[0, 0], [9,0]], 0);
            expect(angles).toEqual([0, 1, 1, 0]);
        });

        test('right to left', () => {
            const angles = calculateAngles([[0, 0], [9,0]], 1);
            expect(angles).toEqual([1, 0, 0, 1]);
        });

        test('up to down', () => {
            const angles = calculateAngles([[0, 0], [0,9]], 0);
            expect(angles).toEqual([0, 0, 1, 1]);
        });

        test('down to up', () => {
            const angles = calculateAngles([[0, 0], [0,9]], 1);
            expect(angles).toEqual([1, 1, 0, 0]);
        })
    });

    describe('loop over corner', () => {
        test('left up corner', () => {
            const angles = calculateAngles([[0, 9], [0, 0], [9,0]], 1);
            expect(angles).toEqual([0, 0, 1, 0]);
        });

        test('right up corner', () => {
            const angles = calculateAngles([[0, 0], [9,0], [9, 9]], 1);
            expect(angles).toEqual([0, 0, 0, 1]);
        });

        test('right bottom corner', () => {
            const angles = calculateAngles([[0,9], [9, 9], [9, 0]], 1);
            expect(angles).toEqual([1, 0, 0, 0]);
        });

        test('left bottom corner', () => {
            const angles = calculateAngles([[0, 0], [0, 9], [9, 9]], 1);
            expect(angles).toEqual([0, 1, 0, 0]);
        })
    });
});


