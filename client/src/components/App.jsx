import React, { useState, useRef, useReducer } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { GameContext } from './GameContext.jsx';
import Game from './Game.jsx';
import Ship from './Ship.jsx';

const initialGameState = {
  screen: {
    width: Math.round($(window).width() * 0.95),
    height: Math.round($(window).height() * 0.95),
  },
  mouse: {
    x: 0,
    y: 0,
  },
  bullet: {
    canShoot: false,
    speed: 1,
  },
  updateSpeed: Math.floor(1000 / 120), // in ms
  level: 1,
  lives: 3,
  objects: {
    player: null,
    asteroids: [],
    bullets: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'mouse':
      state.mouse.x = action.position.x;
      state.mouse.y = action.position.y;
      return state;
    case 'asteroid':
      state.objects.asteroids.push(action.asteroid);
      return state;
    case 'bullet':
      state.objects.bullets.push(action.bullet);
      return state;
    case 'player':
      state.objects.player = action.player;
      return state;
  }
};

const App = () => {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);
  console.log('Rendered the App!');
  const canvasRef = useRef(null);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      <canvas
        width={gameState.screen.width}
        height={gameState.screen.height}
        ref={canvasRef}
      ></canvas>
      <Game canvas={canvasRef} />
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, app);
