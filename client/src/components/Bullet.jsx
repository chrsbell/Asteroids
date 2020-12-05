import React, { useEffect, useContext } from 'react';
import { GameContext } from './GameContext.jsx';
import Controller from './Controller.js';
import GameObject from './GameObject.jsx';

// create a bullet with set velocity in direction (radians)
const Bullet = function (x, y, direction) {
  const { gameState, dispatch } = useContext(GameContext);

  GameObject.call(this, null, { width: 10, height: 10 });
  useEffect(() => {
    this.setAbsolutePosition(x, y);
    this.setVelocity(
      gameState.bullet.speed * Math.cos(direction),
      gameState.bullet.speed * Math.sin(direction)
    );
  }, []);
  return null;
};

Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;

// translates the bullet by the specified offset
Bullet.prototype.translate = function (offsetX, offsetY) {
  let newPosX = this.position.current.x + offsetX;
  let newPosY = this.position.current.y + offsetY;
  const maxDimension = Math.max(this.dimensions.width, this.dimensions.height);
  if (newPosX - maxDimension > this.screenWidth) {
    // newPosX = 0;
  }
  if (newPosY - maxDimension > this.screenHeight) {
    // newPosY = 0;
  }
  this.position.current = { x: newPosX, y: newPosY };
};

Bullet.prototype.render = function (ctx) {
  ctx.setTransform();
  ctx.translate(this.position.current.x, this.position.current.y);
  ctx.ellipse(x, y, this.dimensions.width / 2, this.dimensions.width / 2, 0, 0, Math.PI * 2);
};

export default Bullet;
