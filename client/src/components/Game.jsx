import state from './State.js';
import Ship from './Ship.jsx';
import BulletView from './BulletView.jsx';
import AsteroidView from './AsteroidView.jsx';
import Stats from 'stats.js';

// fps counter
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

class Game {
  constructor() {
    this.player = new Ship();
    this.canvas = state.ctx.canvas;
    this.resizeCanvas();
    this.update();
    this.render();
  }

  update() {
    if (state.objects.player) {
      state.objects.player.update();
    }
    for (let asteroid of state.objects.asteroids) {
      asteroid.update();
    }
    for (let bullet of state.objects.bullets) {
      bullet.update();
    }
    setTimeout(this.update, state.updateSpeed);
  }

  // need to resize canvas according to device pixel ratio
  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  resizeCanvas() {
    const { width, height } = canvas.getBoundingClientRect();

    if (this.canvas.width !== width || this.canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;
      state.ctx.scale(ratio, ratio);
    }
  }

  render() {
    stats.end();
    // clear the screen
    state.ctx.setTransform();
    state.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (state.objects.player) {
      state.objects.player.render(state.ctx);
    }
    for (let asteroid of state.objects.asteroids) {
      asteroid.render();
    }
    for (let bullet of state.objects.bullets) {
      bullet.render();
    }
    stats.begin();
    setTimeout(render, state.renderSpeed);
  }
}

export default Game;
