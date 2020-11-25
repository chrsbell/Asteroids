import React, { useEffect, useContext } from 'react';
import { GameContext } from './GameContext.jsx';
import Ship from './Ship.jsx';

const Game = () => {
  const { gameState, dispatch } = useContext(GameContext);
  const PlayerShip = new Ship();
  useEffect(() => {
    dispatch({ type: 'player', player: PlayerShip });
  }, []);
  return PlayerShip;
};

export default Game;
