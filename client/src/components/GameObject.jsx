import React, { useState, useRef, useContext, useEffect } from 'react';
import state from './State.js';

// functional prototype class for all game objects
const GameObject = function (vertices, dimensions) {
  this.dimensions = dimensions;
  this.screenWidth = state.ctx.canvas.width;
  this.screenHeight = state.ctx.canvas.height;
  this.vertices = vertices;
  // current rotation in radians (maintain value between function calls without triggering re-render)
  this.rotation = useRef(0);
  // current position of object
  this.position = useRef({ x: 0, y: 0 });
  // velocity of the object
  this.velocity = useRef({ x: 1, y: 0 });
};

GameObject.prototype.update = function () {
  if (this.velocity.current.x > 0 || this.velocity.current.y > 0) {
    this.translate(this.velocity.current.x, this.velocity.current.y);
  }
};

// rotates the svg in radians
// could memoize this?
GameObject.prototype.rotate = function (angleInRadians) {
  this.rotation.current = angleInRadians;
};

// translates the game object by the specified offset
GameObject.prototype.translate = function (offsetX, offsetY) {
  let newPosX = this.position.current.x + offsetX;
  let newPosY = this.position.current.y + offsetY;
  const maxDimension = Math.max(this.dimensions.width, this.dimensions.height);
  if (newPosX - maxDimension > this.screenWidth) {
    newPosX = 0;
  }
  if (newPosY - maxDimension > this.screenHeight) {
    newPosY = 0;
  }
  this.position.current = { x: newPosX, y: newPosY };
};

// set the absolute position of the game object
GameObject.prototype.setAbsolutePosition = function (posX, posY) {
  this.position.current = { x: posX, y: posY };
};

// renders the object using the CanvasRenderingContext2D interface
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
GameObject.prototype.render = function (ctx) {
  // set the context's transformation matrix to identity
  ctx.setTransform();
  // rotate around origin
  ctx.translate(this.position.current.x, this.position.current.y);
  ctx.translate(this.dimensions.width / 2, this.dimensions.height / 2);
  ctx.rotate(this.rotation.current);
  ctx.translate(-this.dimensions.width / 2, -this.dimensions.height / 2);

  // render vertices as lines
  ctx.beginPath();
  ctx.moveTo(this.vertices[0][0], this.vertices[0][1]);
  for (let i = 1; i < this.vertices.length; i++) {
    ctx.lineTo(this.vertices[i][0], this.vertices[i][1]);
  }
  ctx.closePath();
  ctx.stroke();
};

export default GameObject;
