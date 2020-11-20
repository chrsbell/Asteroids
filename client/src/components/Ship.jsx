import React, { useEffect } from 'react';
import { atan2 } from 'mathjs';
import GameObject from './GameObject.jsx';

// ship should be visible
// ship should be able to change direction based on cursor position
// ship should be able to shoot bullets if mouse pressed

const Ship = function () {
  const vertices = [
    [0, 48],
    [18, 0],
    [32, 48],
    [18, 42],
  ];
  // base class constructor
  GameObject.call(this, vertices);
  // component mount
  useEffect(() => {
    this.setAbsolutePosition(250, 250);
  }, []);
  return [this, this.render()];
};

Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

// rotates the ship towards the cursor
Ship.prototype.rotateToCursor = function (e) {
  this.rotate(
    -atan2(e.clientY - this.position.current[1], e.clientX - this.position.current[0]) - Math.PI / 2
  );
};

export default Ship;
