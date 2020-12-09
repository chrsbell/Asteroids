import { createStore } from 'redux';

let initialState = {
  context: null,
  mouse: {
    x: 0,
    y: 0,
  },
  bullet: {
    params: null,
    speed: 1,
  },
  updateSpeed: Math.floor(1000 / 120), // in ms
  renderSpeed: Math.floor(1000 / 120), // in ms
  level: 1,
  lives: 3,
  objects: {
    player: null,
    asteroids: {},
    numAsteroids: 0,
    bullets: {},
    numBullets: 0,
  },
};

const reducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case 'context':
      return {
        ...state,
        context: action.value,
      };
    case 'mouse':
      return {
        ...state,
        mouse: action.value,
      };
    case 'player':
      return {
        ...state,
        objects: {
          ...state.objects,
          player: action.value,
        },
      };
    case 'createBullet':
      id = state.objects.numBullets;
      return {
        ...state,
        objects: {
          ...state.objects,
          bullets: { ...state.objects.bullets, [id]: action.value },
          numBullets: id + 1,
        },
      };
    case 'deleteBullet':
      id = action.value;
      debugger;
      const bullets = { ...state.objects.bullets };
      delete bullets[id];
      return {
        ...state,
        objects: {
          ...state.objects,
          bullets,
          numBullets: state.objetcs.numBullets - 1,
        },
      };
    case 'createAsteroid':
      id = state.objects.numAsteroids;
      return {
        ...state,
        objects: {
          ...state.objects,
          asteroids: { ...state.objects.asteroids, [id]: action.value },
          numAsteroids: id + 1,
        },
      };
    case 'deleteAsteroid':
      id = action.value;
      const asteroids = { ...state.objects.asteroids };
      delete asteroids[id];
      return {
        ...state,
        objects: {
          ...state.objects,
          asteroids,
          numAsteroids: state.objetcs.numAsteroids - 1,
        },
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
