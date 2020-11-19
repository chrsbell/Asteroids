import React, { useState } from 'react';
import GameObject from './GameObject.js';
// ship should be visible
// ship should be able to change direction based on cursor position
// ship should be able to shoot bullets if mouse pressed

const Ship = () => {
  const shipVertices = [
    [0, 48],
    [18, 0],
    [32, 48],
    [18, 42],
  ];
  const obj = new GameObject(shipVertices);
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points={obj.getSVGCoords()} fill="none" stroke="black" />
    </svg>
  );
};

export default Ship;
