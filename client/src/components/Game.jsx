import React, { useEffect, useContext, useRef } from 'react';
import { GameContext } from './GameContext.jsx';
import Ship from './Ship.jsx';
import AsteroidView from './AsteroidView.jsx';
import Stats from 'stats.js';

// fps counter
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const Game = () => {
  const { gameState, dispatch } = useContext(GameContext);
  const [playerShip, playerShipRender] = new Ship();
  const update = () => {
    stats.end();
    playerShip.update();
    stats.begin();
    setTimeout(update, gameState.updateSpeed);
  };

  useEffect(() => {
    stats.begin();
    dispatch({ type: 'player', player: playerShip });
    update();
  }, []);
  return (
    <>
      {playerShipRender}
      {<AsteroidView />};
    </>
  );
};

export default Game;
