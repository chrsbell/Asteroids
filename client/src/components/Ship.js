import { store } from './Store.js';
import GameObject from './GameObject.js';
import Controller from './Controller.js';
import BulletView from './BulletView.js';

// ship should be able to shoot bullets if mouse pressed

class Ship extends GameObject {
  constructor() {
    debugger;
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

  rotateToCursor(e) {
    let mouseX = 0;
    let mouseY = 0;
    // the mouse moved, so update the current position
    if (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
      store.dispatch({ type: 'mouse', value: { x: mouseX, y: mouseY } });
    } else {
      const { mouse } = store.getState();
      // the mouse didn't move
      mouseX = mouse.x;
      mouseY = mouse.y;
    }

    // rotates the ship towards the cursor
    this.rotate(Math.atan2(mouseY - this.position.y, mouseX - this.position.x) + Math.PI / 2);
  }
  // need to rotate the ship after each translation towards the mouse
  update() {
    debugger;
    super.update();
    this.rotateToCursor();
  }
  // shoot bullets in the direction of the cursor
  shoot() {
    if (this.canShoot) {
      this.bullets.createBullet(this.position.x, this.position.y, this.rotation);
      this.canShoot = false;
      setTimeout(() => {
        this.canShoot = true;
      }, 1000);
    }
  }
}

export default Ship;
