import React, {ComponentType, useMemo} from 'react';
import {SnakeReducerState} from "../../snakeReducer";
import Snake from "./Snake";
import './Play.css';
import Apple from "./Apple";
import Grid from "./Grid";
import {CELL_SIZE} from "../../constants";

type PlayProps = Pick<SnakeReducerState, 'gridSize' | 'body' | 'apple'>;
const Play: ComponentType<PlayProps> = ({gridSize, body, apple}) => {
    const style = useMemo(() => ({
        width: gridSize * CELL_SIZE,
        height: gridSize * CELL_SIZE,
    }), [gridSize]);
    return (
        <div className="play" style={style}>
            <Grid
                gridSize={gridSize}
            />
            <Snake
                body={body}
                gridSize={gridSize}
            />
            <Apple apple={apple} />
        </div>
    );
};


export default Play;