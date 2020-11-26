import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { GameContext } from './GameContext.jsx';
import Game from './Game.jsx';
import Ship from './Ship.jsx';

const initialGameState = {
  screenWidth: 1920,
  screenHeight: 1080,
  level: 1,
  lives: 3,
  objects: {
    player: null,
    asteroids: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'asteroid':
      state.objects.asteroids.push(action.asteroid);
      return state;
    case 'player':
      state.objects.player = action.player;
      return state;
  }
};

const App = () => {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      <Game />
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
