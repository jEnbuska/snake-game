import React, {ComponentType, memo} from 'react';
import {SnakeReducerState} from "../../snakeReducer";
import {CELL_SIZE} from "../../constants";

type AppleProps = Pick<SnakeReducerState, 'apple'>
const Apple: ComponentType<AppleProps> = memo(({apple}) => {
    const [x, y] = apple;
    const style = {
        left: x * CELL_SIZE + CELL_SIZE / 4,
        width: CELL_SIZE / 2,
        height: CELL_SIZE / 2,
        top: y * CELL_SIZE + CELL_SIZE / 4,
    };
    return <span style={style} className="play__apple"/>;
});

export default Apple;