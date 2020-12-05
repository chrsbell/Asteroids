import React, { createContext } from 'react';

const initialGameState = {
  ctx: null,
  canvas: null,
  mouse: {
    x: 0,
    y: 0,
  },
  bullet: {
    params: null,
    speed: 1,
  },
  updateSpeed: Math.floor(1000 / 120), // in ms
  renderSpeed: Math.floor(1000 / 120), // in ms
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
    // surely, there must be a better way than this
    case 'generateBullet':
      state.bullet.params = action.params;
      return state;
    // yikes.
    case 'addBullet':
      state.objects.bullets.push(action.bullet);
      return state;
    case 'player':
      state.objects.player = action.player;
      return state;
    case 'ctx':
      state.ctx = action.ctx;
      return state;
  }
};

export const GameContext = createContext();
export { initialGameState, reducer };
