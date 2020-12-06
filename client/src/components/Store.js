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
    asteroids: [],
    bullets: [],
  },
};

const reducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export const store = createStore(reducer);
