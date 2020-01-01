import React, {ComponentType, memo, useMemo} from 'react';
import {SnakeReducerState} from "../../snakeReducer";
import {range} from "../../utils";
import {CELL_SIZE} from '../../constants'

type GridProps = Pick<SnakeReducerState, 'gridSize'>;
const Grid: ComponentType<GridProps> = memo(({gridSize}) => {
    const gridArray = useMemo(() => range(gridSize), [gridSize]);
    return (
        <>
            {gridArray.map(y => (
                gridArray.map(x => (
                    <span
                        className="play__grid-cell"
                        key={`cell-${x}`}
                        style={{height: CELL_SIZE, width: CELL_SIZE, left: CELL_SIZE * x, top: CELL_SIZE * y}}
                    />
                ))
            ))}
        </>
    );
});

export default Grid;