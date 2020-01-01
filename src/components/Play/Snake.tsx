import React, {ComponentType, memo} from 'react';
import {calculateAngles} from '../../utils'
import {SnakeReducerState} from "../../snakeReducer";
import {CELL_SIZE} from "../../constants";

type SnakeProps = Pick<SnakeReducerState, 'body' | 'gridSize'>;
const Snake: ComponentType<SnakeProps> = memo(({body, gridSize}) => {
    return (
        <>
            {body.map((_: any, index: number) => (
                <SnakeCell
                    key={`cell-${index}`}
                    gridSize={gridSize}
                    body={body}
                    index={index}
                />
            ))}
        </>
    )
});

export default Snake;

type SnakeCellProps = SnakeProps & { index: number }
const SnakeCell: ComponentType<SnakeCellProps> = ({index, body, gridSize}) => {
    const cell = body[index];
    const [ x, y ] = cell;
    const angles = calculateAngles(body, index, gridSize);
    const style = {
        borderRadius: angles.map(it => `${it*CELL_SIZE}px`).join(' '),
        left: x * CELL_SIZE,
        width: CELL_SIZE,
        height: CELL_SIZE,
        top: y * CELL_SIZE,
    };
    return (
        <span className="play__snake-cell" style={style} />
    )
};

