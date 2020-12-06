import { store } from './Store.js';
import Ship from './Ship.js';
import BulletView from './BulletView.js';
import AsteroidView from './AsteroidView.js';
import Stats from 'stats.js';

// fps counter
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

class Game {
  constructor() {
    this.player = new Ship();
    store.dispatch({ type: 'player', value: this.player });
    this.resizeCanvas();
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.update();
    this.render();
  }

  update() {
    const { objects, updateSpeed } = store.getState();
    if (objects.player) {
      objects.player.update();
    }
    for (let asteroid of objects.asteroids) {
      asteroid.update();
    }
    for (let bullet of objects.bullets) {
      bullet.update();
    }
    setTimeout(this.update, updateSpeed);
  }

  // need to resize canvas according to device pixel ratio
  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  resizeCanvas() {
    const { context } = store.getState();
    const canvas = context.canvas;
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
    }
  }

  render() {
    stats.end();
    const { context, objects, renderSpeed } = store.getState();
    const canvas = context.canvas;
    // clear the screen
    context.setTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (objects.player) {
      objects.player.render(context);
    }
    for (let asteroid of objects.asteroids) {
      asteroid.render(context);
    }
    for (let bullet of objects.bullets) {
      bullet.render(context);
    }
    stats.begin();
    setTimeout(this.render, renderSpeed);
  }
}

export default Game;
