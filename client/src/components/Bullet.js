import { store } from './Store.js';
import Controller from './Controller.js';
import GameObject from './GameObject.js';

// create a bullet with set velocity in direction (radians)
class Bullet extends GameObject {
  constructor(id, x, y, direction) {
    super(id, null, { width: 10, height: 10 });
    this.setAbsolutePosition(x, y);
    const { speed } = store.getState().bullet;
    this.velocity = {
      x: speed * Math.cos(direction - Math.PI / 2),
      y: speed * Math.sin(direction - Math.PI / 2),
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
  render(context) {
    context.setTransform();
    // context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.ellipse(
      this.position.x,
      this.position.y,
      this.dimensions.width / 2,
      this.dimensions.width / 2,
      0,
      0,
      Math.PI * 2
    );
    context.stroke();
  }
}

export default Bullet;
