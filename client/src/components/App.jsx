import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Controller from './Controller.js';
import Ship from './Ship.jsx';

const App = () => {
  const [PlayerShip, PlayerShipRender] = new Ship();
  const Input = new Controller({
    mousemove: [PlayerShip.rotateToCursor.bind(PlayerShip)],
    mousedown: [],
    mouseup: [],
    keypress: [],
    keyup: [],
  });
  return PlayerShipRender;
};

ReactDOM.render(<App />, document.getElementById('app'));
