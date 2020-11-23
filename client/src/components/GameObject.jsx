import React, { useState, useRef } from 'react';
import { matrix, multiply, add, cos, sin, identity, zeros, index, subset } from 'mathjs';

// game objects should be able to wrap around screen

// functional prototype class for all game objects
const GameObject = function (vertices, width, height) {
  // width and height of the sprite
  this.width = width;
  this.height = height;
  this.vertices = matrix(vertices);
  // the transformed coordinates
  this.transformation = useRef(this.vertices);
  // current rotation in radians (maintain value between function calls without triggering re-render)
  this.rotation = useRef(0);
  // current position of object
  this.position = useRef([0, 0]);
  // matrices for rotation and translation
  [this.rotationMatrix, this.setRotationMatrix] = useState(identity(3, 3));
  [this.translationMatrix, this.setTranslationMatrix] = useState(zeros(this.vertices.size()));
};

// rotates the svg in radians
GameObject.prototype.rotate = function (angleInRadians) {
  this.rotation.current = angleInRadians;
  // math haHA https://developers.foxitsoftware.com/kb/wp-content/uploads/formula-1024x418.png
  const Cx = this.width / 2;
  const Cy = this.height / 2;
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
  const newPosX = this.position.current[0] + offsetX;
  const newPosY = this.position.current[1] + offsetY;
  this.position.current = [newPosX, newPosY];
  this.setTranslationMatrix(
    matrix([
      [newPosX, newPosY, 1],
      [newPosX, newPosY, 1],
      [newPosX, newPosY, 1],
      [newPosX, newPosY, 1],
    ])
  );
};

// set the absolute position of the game object
GameObject.prototype.setAbsolutePosition = function (posX, posY) {
  this.position.current = [posX, posY];
  const numRows = this.vertices.size()[0];
  // create a rows of new position coordinates
  this.setTranslationMatrix(matrix([...Array(numRows).keys()].map((row) => [posX, posY, 1])));
};

// return the coordinates of the svg in polygon point format
GameObject.prototype.getSVGCoords = function () {
  // could use a regex here
  const formatted = subset(this.transformation.current, index([0, 1, 2], [0, 1]));
  let svgCoords = formatted.format().replaceAll('],', '');
  svgCoords = svgCoords.replaceAll('[', '');
  svgCoords = svgCoords.replaceAll(']', '');
  svgCoords = svgCoords.replaceAll(', ', ',');
  return svgCoords;
};

// caculates the current transformation matrix
GameObject.prototype.calcTransformationMatrix = function () {
  console.log(`Rotation: ${this.rotation.current}, Position: ${this.position.current}`);
  this.transformation.current = add(
    multiply(this.vertices, this.rotationMatrix),
    this.translationMatrix
  );
};

// renders the react component
GameObject.prototype.render = function () {
  this.calcTransformationMatrix();
  return (
    <svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <polygon points={this.getSVGCoords()} fill="none" stroke="black" />
    </svg>
  );
};

export default GameObject;
