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
  const PlayerShip = new Ship();

  const canvas = gameState.canvas;

  const update = () => {
    gameState.objects.player.update();
    for (let asteroid of gameState.objects.asteroids) {
      asteroid.update();
    }
    setTimeout(update, gameState.updateSpeed);
  };

  // need to resize canvas according to device pixel ratio
  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const resizeCanvas = () => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      const context = gameState.ctx;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
    }
  };

  const render = () => {
    stats.end();
    if (gameState.ctx) {
      // clear the screen
      gameState.ctx.clearRect(0, 0, gameState.ctx.canvas.width, gameState.ctx.canvas.height);
      if (gameState.objects.player) {
        gameState.objects.player.render(gameState.ctx);
      }
    }
    stats.begin();
    setTimeout(render, gameState.renderSpeed);
  };

  useEffect(() => {
    stats.begin();
    dispatch({ type: 'player', player: PlayerShip });
    if (canvas) {
      resizeCanvas();
    }
    // update();
    render();
  }, []);
  return null;
};

export default Game;
