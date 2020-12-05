import state from './State.js';
import GameObject from './GameObject.jsx';
import Controller from './Controller.js';
import BulletView from './BulletView.jsx';

// ship should be able to shoot bullets if mouse pressed

class Ship extends GameObject {
  constructor() {
    const vertices = [
      [0, 48],
      [18, 0],
      [32, 48],
      [18, 42],
    ];
    super(vertices, { width: 32, height: 48 });
    this.canShoot = true;
    this.bullets = new BulletView();
    this.shoot = this.shoot.bind(this);
    this.rotateToCursor = this.rotateToCursor.bind(this);
    Controller.addCallback('keypress', this.shoot, 32);
    Controller.addCallback('mousemove', this.rotateToCursor);
    this.setAbsolutePosition(this.screenWidth / 2, this.screenHeight / 2);
  }
  rotateToCursor() {
    let mouseX = 0;
    let mouseY = 0;
    // the mouse moved, so update the current position
    if (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    } else {
      // the mouse didn't move
      mouseX = mouse.x;
      mouseY = mouse.y;
    }

    // rotates the ship towards the cursor
    this.rotate(
      Math.atan2(mouseY - this.position.current.y, mouseX - this.position.current.x) + Math.PI / 2
    );
  }
  // need to rotate the ship after each translation towards the mouse
  update() {
    GameObject.prototype.update.call(this);
    this.rotateToCursor();
  }
  // shoot bullets in the direction of the cursor
  shoot() {
    if (this.canShoot) {
      this.bullets.createBullet(
        this.position.current.x,
        this.position.current.y,
        this.rotation.current
      );
      this.canShoot = false;
      setTimeout(() => {
        this.canShoot = true;
      }, 1000);
    }
  }
}

export default Ship;
