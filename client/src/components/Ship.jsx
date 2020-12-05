import React, { useEffect, useContext } from 'react';
import { GameContext } from './GameContext.jsx';
import GameObject from './GameObject.jsx';
import Bullet from './Bullet.jsx';
import Controller from './Controller.js';
// ship should be visible
// ship should be able to change direction based on cursor position
// ship should be able to shoot bullets if mouse pressed

const Ship = function () {
  const { gameState, dispatch } = useContext(GameContext);
  const vertices = [
    [0, 48],
    [18, 0],
    [32, 48],
    [18, 42],
  ];
  // base class constructor
  GameObject.call(this, vertices, { width: 32, height: 48 });
  this.rotateToCursor = this.rotateToCursor.bind(this, gameState.mouse, dispatch);
  this.shoot = this.shoot.bind(this, dispatch);
  // component mount
  useEffect(() => {
    Controller.addCallback('keypress', this.shoot, 32);
    Controller.addCallback('mousemove', this.rotateToCursor);
    this.setAbsolutePosition(this.screenWidth / 2, this.screenHeight / 2);
  }, []);
  return null;
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
    Math.atan2(mouseY - this.position.current.y, mouseX - this.position.current.x) + Math.PI / 2
  );
};

// shoot bullets in the direction of the cursor
Ship.prototype.shoot = function (dispatch, e) {
  const PlayerBullet = new Bullet(
    this.position.current.x,
    this.position.current.y,
    this.rotation.current
  );
  dispatch({ type: 'bullet', PlayerBullet });
};

export default Ship;
