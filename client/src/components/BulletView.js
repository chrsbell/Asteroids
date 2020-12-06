import { store } from './Store.js';
import Bullet from './Bullet.js';

class BulletView {
  constructor() {
    this.bullets = [];
  }
  createBullet(dispatch, x, y, rotation) {
    const GeneratedBullet = new Bullet(...gameState.bullet.params);
    store.dispatch({ type: 'bullet', value: GeneratedBullet });
    this.bullets.push();
  }
}

export default BulletView;
