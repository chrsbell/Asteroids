import React, { useState, useEffect, useRef, useReducer } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { store } from './Store.js';
import Game from './Game.js';

// react isn't really necessary here
const App = () => {
  console.log('Rendered the App!');
  const canvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [level, setLevel] = useState(0);
  let game = null;
  useEffect(() => {
    setCanvasReady(true);
    const context = canvasRef.current.getContext('2d');
    store.dispatch({ type: 'context', value: context });
    setLevel(store.getState().level);
  }, []);
  // create a new game when level changes, need to subscribe to level changes (this is incorrect)
  // not necessary to resize device canvas every time
  useEffect(() => {
    if (canvasReady) {
      console.log(`New game created.`);
      game = new Game(level);
    }
  }, [level]);
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
