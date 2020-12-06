import { store } from './Store.js';
import Controller from './Controller.js';
import GameObject from './GameObject.js';

// create a bullet with set velocity in direction (radians)
class Bullet {
  constructor(x, y, direction) {
    this.setAbsolutePosition(x, y);
    this.velocity = {
      x: store.getState().bullet.speed * Math.cos(direction),
      y: store.getState().bullet.speed * Math.sin(direction),
    };
  }
  // translates the bullet by the specified offset
  translate(offsetX, offsetY) {
    let newPosX = this.position.x + offsetX;
    let newPosY = this.position.y + offsetY;
    const maxDimension = Math.max(this.dimensions.width, this.dimensions.height);
    if (newPosX - maxDimension > this.screenWidth) {
      // newPosX = 0;
    }
    if (newPosY - maxDimension > this.screenHeight) {
      // newPosY = 0;
    }
    this.position = { x: newPosX, y: newPosY };
  }
  render(ctx) {
    ctx.setTransform();
    ctx.translate(this.position.x, this.position.y);
    ctx.ellipse(x, y, this.dimensions.width / 2, this.dimensions.width / 2, 0, 0, Math.PI * 2);
  }
}

export default Bullet;
