import { store } from './Store.js';
import Asteroid from './Asteroid.js';
// should spawn set number of asteroids from random off screen locations
// new asteroid should spawn when an asteroid is destroyed

class ObstacleGenerator {
  constructor(level) {
    console.log(`Welcome to level ${level}.`);
    let asteroid = new Asteroid(store.getState().numAsteroids);
    store.dispatch({ type: 'createAsteroid', value: asteroid });
    console.log(store.getState());
    debugger;
  }
}

export default ObstacleGenerator;
