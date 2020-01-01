import React, {ComponentType, useEffect, useReducer, useRef, useState} from 'react';
import snakeReducer, {snakeReducerDefaultState, SnakeReducerDispatcher} from "../../snakeReducer";
import Play from "../Play/Play";
import Settings from '../Settings/Settings';
import './Game.css'

const Game: ComponentType = () => {
  const [tickGap, setTickGap] = useState(300);
    const [state, dispatch] = useReducer(snakeReducer, snakeReducerDefaultState);
    useKeyboardMovementListener(dispatch);
    const ref = usePlayTickDispatcher(dispatch, tickGap);
  return (
      <div className="game">
          <div ref={ref} tabIndex={-1}>
              <Play {...state}/>
          </div>
          <Settings tickGap={tickGap} setTickGap={setTickGap} gameState={state}/>
      </div>
  )
};

export default Game;

function useKeyboardMovementListener(dispatch: SnakeReducerDispatcher) {
    useEffect(function registerKeyboardMovementListener() {
        const keydownListener = (e: KeyboardEvent) => {
            switch(e.key) {
                case 'ArrowUp': return dispatch('UP');
                case 'ArrowRight': return dispatch('RIGHT');
                case 'ArrowDown': return dispatch('DOWN');
                case 'ArrowLeft': return dispatch('LEFT');
            }
        };
        document.addEventListener('keydown', keydownListener);
        return () => document.removeEventListener('keydown', keydownListener);
    }, [dispatch]);
}

function usePlayTickDispatcher(dispatch: SnakeReducerDispatcher, tickGap: number) {
    const [paused, setPaused] = useState(true);
    const ref = useRef<any>(null);
    const interval = useRef<any>(0);
    useEffect(() => {
        ref.current.addEventListener('focus', () => setPaused(false));
        ref.current.addEventListener('blur', () => setPaused(true));
    }, []);

    useEffect(() => {
        ref.current.style.opacity = paused ? .5 : 1;
        if(paused) {
            clearInterval(interval.current);
            return;
        } else {
            interval.current = setInterval(() => {
                dispatch('TICK');
            }, tickGap)
        }
        return () => clearInterval(interval.current);
    }, [paused, tickGap, dispatch]);
    return ref;
}
