import React, { useState, useEffect, useRef } from 'react';
import GameObject from './GameObject.jsx';

// ship should be visible
// ship should be able to change direction based on cursor position
// ship should be able to shoot bullets if mouse pressed

var Ship = function () {
  const vertices = [
    [0, 48],
    [18, 0],
    [32, 48],
    [18, 42],
  ];
  // base class constructor
  GameObject.call(this, vertices);
  useEffect(() => {
    // component mount
    this.setAbsolutePosition(500, 500);
    setInterval(() => {
      this.translate(0.1, 0.1);
      this.rotate(this.rotation.current + Math.PI / 10);
    }, 10);
  }, []);
  return this.render();
};

Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

export default Ship;
