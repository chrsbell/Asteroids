import React, { useEffect, useContext } from 'react';
import { GameContext } from './GameContext.jsx';
import Ship from './Ship.jsx';
import AsteroidView from './AsteroidView.jsx';

const Game = () => {
  const { gameState, dispatch } = useContext(GameContext);
  const playerShip = new Ship();
  useEffect(() => {
    dispatch({ type: 'player', player: playerShip });
  }, []);
  return (
    <>
      {playerShip}
      <AsteroidView />;
    </>
  );
};

export default Game;
