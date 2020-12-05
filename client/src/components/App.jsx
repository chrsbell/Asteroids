import React, { useState, useEffect, useRef, useReducer } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { initialGameState, reducer, GameContext } from './GameContext.jsx';
import Game from './Game.jsx';
import Ship from './Ship.jsx';

const App = () => {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);
  console.log('Rendered the App!');
  const canvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);
  useEffect(() => {
    setCanvasReady(true);
    dispatch({ type: 'ctx', ctx: canvasRef.current.getContext('2d') });
  }, []);
  return (
    <>
      <canvas
        width={Math.round($(window).width() * 0.95)}
        height={Math.round($(window).height() * 0.95)}
        ref={canvasRef}
      ></canvas>
      <GameContext.Provider value={{ gameState, dispatch }}>
        {canvasReady ? <Game /> : null}
      </GameContext.Provider>
    </>
  );
};

ReactDOM.render(<App />, app);
