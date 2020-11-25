import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { GameContext } from './GameContext.jsx';
import Game from './Game.jsx';
import Ship from './Ship.jsx';

//
const initialGameState = {
  objects: {
    player: null,
    asteroids: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'asteroid':
      return {
        ...state,
        objects: {
          ...state.objects,
          asteroids: [...state.asteroids, action.asteroid],
        },
      };
    case 'player':
      return {
        ...state,
        objects: {
          ...state.objects,
          player: action.player,
        },
      };
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
