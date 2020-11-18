import React from 'react';

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
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,48 18,0 32,48 18,42" fill="none" stroke="black" />
    </svg>
  );
};

export default Ship;
