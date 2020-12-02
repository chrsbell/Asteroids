import React, { useEffect, useContext } from 'react';
import Controller from './Controller.js';
import GameObject from './GameObject.jsx';

// create a bullet with set velocity in direction (radians)
const Bullet = function (x, y, direction) {
  const { gameState, dispatch } = useContext(GameContext);

  useEffect(() => {
    Controller.addCallback('keypress', this.shoot, 32);
    Controller.addCallback('mousemove', this.rotateToCursor);
    this.setAbsolutePosition(x, y);
    this.setVelocity(
      gameState.bullet.speed * Math.cos(direction),
      gameState.bullet.speed * Math.sin(direction)
    );
  }, []);
};

Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;
