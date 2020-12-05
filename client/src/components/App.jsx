import React, { useState, useEffect, useRef, useReducer } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import state from './State.js';
import Game from './Game.jsx';
import Ship from './Ship.jsx';

const App = () => {
  console.log('Rendered the App!');
  const canvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);
  let game = null;
  useEffect(() => {
    setCanvasReady(true);
    state.ctx = canvasRef.current.getContext('2d');
  }, []);
  if (canvasReady) {
    game = new Game();
  }
  return (
    <>
      <canvas
        width={Math.round($(window).width() * 0.95)}
        height={Math.round($(window).height() * 0.95)}
        ref={canvasRef}
      ></canvas>
    </>
  );
};

ReactDOM.render(<App />, app);
