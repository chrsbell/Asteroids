import React, { useEffect, useContext } from 'react';
import { atan2 } from 'mathjs';
import { GameContext } from './GameContext.jsx';
import GameObject from './GameObject.jsx';
import Bullet from './Bullet.jsx';
import Controller from './Controller.js';
// ship should be visible
// ship should be able to change direction based on cursor position
// ship should be able to shoot bullets if mouse pressed

const Ship = function () {
  const { gameState, dispatch } = useContext(GameContext);
  // vertices should be homogeneous
  const vertices = [
    [0, 48, 1],
    [18, 0, 1],
    [32, 48, 1],
    [18, 42, 1],
  ];
  // base class constructor
  GameObject.call(this, vertices, 32, 48);
  Controller.addCallback('mousemove', this.rotateToCursor.bind(this));
  // component mount
  useEffect(() => {
    this.setAbsolutePosition(gameState.screenWidth / 2, gameState.screenHeight / 2);
  }, []);
  return this.render();
};

Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

// rotates the ship towards the cursor
Ship.prototype.rotateToCursor = function (e) {
  this.rotate(
    atan2(e.clientY - this.position.current[1], e.clientX - this.position.current[0]) + Math.PI / 2
  );
};

// shoot bullets in the direction of the cursor
Ship.prototype.shoot = function (e) {};

export default Ship;
