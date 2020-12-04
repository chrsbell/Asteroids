import React, { useEffect, useContext, useRef } from 'react';
import { GameContext } from './GameContext.jsx';
import Renderer from './Renderer.js';
import Ship from './Ship.jsx';
import AsteroidView from './AsteroidView.jsx';
import Stats from 'stats.js';

// fps counter
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const Game = ({ canvas }) => {
  const { gameState, dispatch } = useContext(GameContext);
  let gameRenderer = new Renderer(canvas);
  const PlayerShip = new Ship();

  const update = () => {
    gameState.objects.player.update();
    for (let asteroid of gameState.objects.asteroids) {
      asteroid.update();
    }
    setTimeout(update, gameState.updateSpeed);
  };

  const render = () => {
    stats.end();
    gameRenderer.draw(0);
    gameRenderer.draw(1);
    stats.begin();
    setTimeout(render, gameState.renderSpeed);
  };

  useEffect(() => {
    stats.begin();
    dispatch({ type: 'player', player: PlayerShip });
    // update();
    render();
  }, []);
  return null;
};

export default Game;
