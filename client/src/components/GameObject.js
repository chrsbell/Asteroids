import { store } from './Store.js';

// prototype class for all game objects
class GameObject {
  constructor(vertices, dimensions) {
    const { context } = store.getState();
    this.dimensions = dimensions;
    this.screenWidth = context.canvas.width;
    this.screenHeight = context.canvas.height;
    this.vertices = vertices;
    // rotation in radians
    this.rotation = 0;
    // position of object
    this.position = { x: 0, y: 0 };
    // velocity of the object
    this.velocity = { x: 1, y: 0 };
  }

  update() {
    debugger;
    if (this.velocity.x > 0 || this.velocity.y > 0) {
      this.translate(this.velocity.x, this.velocity.y);
    }
  }
  // rotates the object in radians
  // could memoize this?
  rotate(angleInRadians) {
    this.rotation = angleInRadians;
  }

  // translates the game object by the specified offset
  translate(offsetX, offsetY) {
    let newPosX = this.position.x + offsetX;
    let newPosY = this.position.y + offsetY;
    const maxDimension = Math.max(this.dimensions.width, this.dimensions.height);
    if (newPosX - maxDimension > this.screenWidth) {
      newPosX = 0;
    }
    if (newPosY - maxDimension > this.screenHeight) {
      newPosY = 0;
    }
    this.position = { x: newPosX, y: newPosY };
  }

  // set the absolute position of the game object
  setAbsolutePosition(posX, posY) {
    this.position = { x: posX, y: posY };
  }

  // renders the object using the CanvasRenderingContext2D interface
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  render(context) {
    debugger;
    // set the context's transformation matrix to identity
    context.setTransform();
    // rotate around origin
    context.translate(this.position.x, this.position.y);
    context.translate(this.dimensions.width / 2, this.dimensions.height / 2);
    context.rotate(this.rotation);
    context.translate(-this.dimensions.width / 2, -this.dimensions.height / 2);

    // render vertices as lines
    context.beginPath();
    context.moveTo(this.vertices[0][0], this.vertices[0][1]);
    for (let i = 1; i < this.vertices.length; i++) {
      context.lineTo(this.vertices[i][0], this.vertices[i][1]);
    }
    context.closePath();
    context.stroke();
  }
}

export default GameObject;
