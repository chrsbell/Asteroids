import { store } from './Store.js';
import GameObject from './GameObject.js';
import Controller from './Controller.js';
import BulletView from './BulletView.js';

class Ship extends GameObject {
  constructor() {
    const vertices = [
      [0, 48],
      [18, 0],
      [32, 48],
      [18, 42],
    ];
    super(0, vertices, { width: 32, height: 48 });
    this.canShoot = true;
    this.bulletGenerator = new BulletView();
    this.shoot = this.shoot.bind(this);
    this.rotateToCursor = this.rotateToCursor.bind(this);
    Controller.addCallback('keypress', this.shoot, 32);
    Controller.addCallback('mousemove', this.rotateToCursor);
    Controller.addCallback(
      'keydown',
      () => {
        this.accelerate = true;
      },
      65
    );
    Controller.addCallback(
      'keyup',
      () => {
        console.log('asdad');
        this.accelerate = false;
      },
      65
    );
    this.setAbsolutePosition(this.screenWidth / 2, this.screenHeight / 2);
    this.acceleration = 0.99;
    this.mass = 5;
    this.maxVelocity = 2;
    this.accelerate = false;
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
  update() {
    this.bulletGenerator.update();
    // need to rotate the ship after each translation towards the mouse
    this.rotateToCursor();
    if (this.accelerate) {
      let vx = Math.cos(this.rotation - Math.PI / 2);
      let vy = Math.sin(this.rotation - Math.PI / 2);
      if (Math.abs(this.velocity.x + vx) < this.maxVelocity) {
        this.velocity.x += vx;
      }
      if (Math.abs(this.velocity.y + vy) < this.maxVelocity) {
        this.velocity.y += vy;
      }
      console.log(this.velocity);
    }
    super.update();
  }
  // shoot bullets in the direction of the cursor
  shoot() {
    if (this.canShoot) {
      // need to offset bullet position by size of object and origin
      const offsetX = (Math.cos(this.rotation - Math.PI / 2) * this.dimensions.height) / 2;
      const offsetY = (Math.sin(this.rotation - Math.PI / 2) * this.dimensions.height) / 2;
      const { numBullets } = store.getState().objects;
      this.bulletGenerator.createBullet(
        numBullets,
        this.position.x + this.dimensions.width / 2 + offsetX,
        this.position.y + this.dimensions.height / 2 + offsetY,
        this.rotation
      );
      this.canShoot = false;
      setTimeout(() => {
        this.canShoot = true;
      }, 1000);
    }
  }
}

export default Ship;
