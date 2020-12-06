import React, { useState, useEffect, useRef, useReducer } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { store } from './Store.js';
import Game from './Game.js';

const App = () => {
  console.log('Rendered the App!');
  const canvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);
  let game = null;
  useEffect(() => {
    setCanvasReady(true);
    const context = canvasRef.current.getContext('2d');
    store.dispatch({ type: 'context', value: context });
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
