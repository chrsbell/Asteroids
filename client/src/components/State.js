const state = {
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

export default state;
