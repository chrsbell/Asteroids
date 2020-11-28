import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { GameContext } from './GameContext.jsx';
import Game from './Game.jsx';
import Ship from './Ship.jsx';

const Window = styled.div`
  position: absolute;
  display: block;
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: dashed red;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const initialGameState = {
  screen: {
    width: Math.round($(window).width() * 0.95),
    height: Math.round($(window).height() * 0.95),
  },
  updateSpeed: 10,
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
  console.log(JSON.stringify(gameState.screen));
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      <Window size={gameState.screen}>
        <Game />
      </Window>
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
