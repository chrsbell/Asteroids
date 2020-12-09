import { store } from './Store.js';
import Bullet from './Bullet.js';

class BulletView {
  constructor() {
    this.bullets = [];
  }
  createBullet(id, x, y, rotation) {
    // not necessary to manually assign id here, can pull last id from store after dispatch
    const GeneratedBullet = new Bullet(id, x, y, rotation);
    store.dispatch({ type: 'createBullet', value: GeneratedBullet });
    this.bullets.push(GeneratedBullet);
  }
  update() {
    for (let bullet of this.bullets) {
      bullet.update();
    }
  }
}

export default BulletView;
