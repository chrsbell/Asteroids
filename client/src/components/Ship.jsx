import React, { useState } from 'react';
import GameObject from './GameObject.jsx';
// ship should be visible
// ship should be able to change direction based on cursor position
// ship should be able to shoot bullets if mouse pressed

class Ship extends GameObject {
  constructor() {
    super({
      vertices: [
        [0, 48],
        [18, 0],
        [32, 48],
        [18, 42],
      ],
    });
    const loopRotate = () => {
      this.rotate(this.rotation + Math.PI / 1000);
      setTimeout(loopRotate, 10);
    };
    setTimeout(loopRotate, 10);
  }
}

export default Ship;
