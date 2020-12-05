import React, { useState, useRef, useContext, useEffect } from 'react';
import { matrix, multiply, add, cos, sin, identity, zeros, index, subset } from 'mathjs';
import { GameContext } from './GameContext.jsx';

// functional prototype class for all game objects
const GameObject = function (vertices, dimensions) {
  const { gameState, dispatch } = useContext(GameContext);
  this.dimensions = dimensions;
  this.screen = gameState.screen;
  this.vertices = matrix(vertices);
  // the transformed coordinates
  this.transformation = useRef(this.vertices);
  // current rotation in radians (maintain value between function calls without triggering re-render)
  this.rotation = useRef(0);
  // current position of object
  this.position = useRef({ x: 0, y: 0 });
  // velocity of the object
  [this.velocity, this.setVelocity] = useState({ x: 0, y: 0 });
  // matrices for rotation and translation
  [this.rotationMatrix, this.setRotationMatrix] = useState(identity(3, 3));
  [this.translationMatrix, this.setTranslationMatrix] = useState(zeros(this.vertices.size()));
};

GameObject.prototype.update = function () {
  if (this.velocity.x > 0 || this.velocity.y > 0) {
    this.translate(this.velocity.x, this.velocity.y);
  }
};

// rotates the svg in radians
// could memoize this?
GameObject.prototype.rotate = function (angleInRadians) {
  this.rotation.current = angleInRadians;
  // math haHA https://developers.foxitsoftware.com/kb/wp-content/uploads/formula-1024x418.png
  // rotate the object around its origin
  const Cx = this.dimensions.width / 2;
  const Cy = this.dimensions.height / 2;
  const Sx = Cx - (Cx * cos(angleInRadians) - Cy * sin(angleInRadians));
  const Sy = Cy - (Cx * sin(angleInRadians) + Cy * cos(angleInRadians));
  this.setRotationMatrix(
    matrix([
      [cos(angleInRadians), sin(angleInRadians), 0],
      [-sin(angleInRadians), cos(angleInRadians), 0],
      [Sx, Sy, 1],
    ])
  );
};

// translates the game object by the specified offset
GameObject.prototype.translate = function (offsetX, offsetY) {
  let newPosX = this.position.current.x + offsetX;
  let newPosY = this.position.current.y + offsetY;
  let maxDimension = Math.max(this.dimensions.width, this.dimensions.height);
  if (newPosX - maxDimension > this.screen.width) {
    newPosX = 0;
  }
  if (newPosY - maxDimension > this.screen.height) {
    newPosY = 0;
  }
  this.position.current = { x: newPosX, y: newPosY };
  const numRows = this.vertices.size()[0];
  // create rows of new position coordinates
  this.setTranslationMatrix(matrix([...Array(numRows).keys()].map((row) => [newPosX, newPosY, 1])));
};

// set the absolute position of the game object
GameObject.prototype.setAbsolutePosition = function (posX, posY) {
  this.position.current = { x: posX, y: posY };
  const numRows = this.vertices.size()[0];
  // create rows of new position coordinates
  this.setTranslationMatrix(matrix([...Array(numRows).keys()].map((row) => [posX, posY, 1])));
};

// caculates the current transformation matrix
GameObject.prototype.calcTransformationMatrix = function () {
  // console.log(
  //   `Rotation: ${this.rotation.current}, Position: ${JSON.stringify(this.position.current)}`
  // );
  this.transformation.current = add(
    multiply(this.vertices, this.rotationMatrix),
    this.translationMatrix
  );
};

// renders the object using the CanvasRenderingContext2D interface
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
GameObject.prototype.render = function (ctx) {
  this.calcTransformationMatrix();
  debugger;
  ctx.beginPath();
  ctx.moveTo(50, 140);
  ctx.lineTo(150, 60);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeRect(75, 140, 150, 110);
};

export default GameObject;
