import { store } from './Store.js';
import GameObject from './GameObject.js';

class Asteroid extends GameObject {
  constructor(id) {
    // this looks like a hexagon
    const vertices = [
      [10, 0, 1],
      [20, 0, 1],

      [30, 10, 1],
      [30, 20, 1],

      [20, 30, 1],
      [10, 30, 1],

      [0, 20, 1],
      [0, 10, 1],
    ];
    super(id, vertices, { width: 30, height: 30 });
    const { context } = store.getState();
    const randX = Math.round(Math.random() * context.canvas.width);
    const randY = Math.round(Math.random() * context.canvas.height);
    this.setAbsolutePosition(randX, randY);
  }
}

export default Asteroid;
