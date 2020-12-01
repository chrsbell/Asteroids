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
  GameObject.call(this, vertices, { width: 32, height: 48 });
  this.rotateToCursor = this.rotateToCursor.bind(this, gameState.mouse, dispatch);
  this.shoot = this.shoot.bind(this, gameState.mouse, dispatch);
  // component mount
  useEffect(() => {
    Controller.addCallback('keypress', this.shoot, 32);
    Controller.addCallback('mousemove', this.rotateToCursor);
    this.setAbsolutePosition(this.screen.width / 2, this.screen.height / 2);
  }, []);
  return [this, this.render()];
};

Ship.prototype = Object.create(GameObject.prototype);
Ship.prototype.constructor = Ship;

// need to rotate the ship after each translation towards the mouse
Ship.prototype.update = function () {
  GameObject.prototype.update.call(this);
  this.rotateToCursor();
};

// rotates the ship towards the cursor
Ship.prototype.rotateToCursor = function (mouse, dispatch, e) {
  let mouseX = 0;
  let mouseY = 0;
  // the mouse moved, so update the current position
  if (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    dispatch({ type: 'mouse', position: { x: mouseX, y: mouseY } });
  } else {
    // the mouse didn't move
    mouseX = mouse.x;
    mouseY = mouse.y;
  }
  this.rotate(
    atan2(mouseY - this.position.current.y, mouseX - this.position.current.x) + Math.PI / 2
  );
};

// shoot bullets in the direction of the cursor
Ship.prototype.shoot = function (e) {
  const PlayerBullet = new Bullet();
};

export default Ship;
