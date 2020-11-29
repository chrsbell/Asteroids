import React, { useEffect, useContext } from 'react';
import { GameContext } from './GameContext.jsx';
import Ship from './Ship.jsx';
import AsteroidView from './AsteroidView.jsx';

const Game = () => {
  const { gameState, dispatch } = useContext(GameContext);
  const [playerShip, playerShipRender] = new Ship();
  const update = () => {
    console.log('Updated Game');
    playerShip.update();
    setTimeout(update, gameState.updateSpeed);
  };
  useEffect(() => {
    dispatch({ type: 'player', player: playerShip });
    update();
  }, []);
  return (
    <>
      {playerShipRender}
      <AsteroidView />;
    </>
  );
};

export default Game;
