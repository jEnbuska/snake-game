import React, {ComponentType, useCallback} from 'react';
import {SnakeReducerState} from "../../snakeReducer";
import './Settings.css'

type SettingsProps = {
    gameState: SnakeReducerState;
    tickGap: number;
    setTickGap(gap: number): void;
}
const Settings: ComponentType<SettingsProps> = ({tickGap, setTickGap, gameState}) => {
    const onTickGapChange = useCallback((e: any) => setTickGap(parseInt(e.target.value)), [setTickGap]);
    return (
        <div className="settings">
            <label>
                Tick gap {tickGap}ms
                <input type="range" min={100} max={600} step="100" value={tickGap} onChange={onTickGapChange} />
            </label>
            <span>
                Ended: {`${gameState.ended}`}
            </span>
            <span>
                Ticks: <b>{`${gameState.ticks}`}</b>
            </span>
            <span>
                Points: <b>{`${gameState.points}`}</b>
            </span>
            <span>
                Direction: <b>{`${gameState.direction}`}</b> / Intent: <b>{`${gameState.intent}`}</b>
            </span>
        </div>
    )
};
export default Settings;