import React, { useState, useRef } from 'react';
import { matrix, multiply, add, cos, sin, identity, zeros } from 'mathjs';

// game objects should be able to wrap around screen

// functional prototype class for all game objects
const GameObject = function (vertices) {
  this.vertices = matrix(vertices);
  // the transformed coordinates
  this.transformation = useRef(this.vertices);
  // current rotation in radians (maintain value between function calls without triggering re-render)
  this.rotation = useRef(0);
  // current position of object
  this.position = useRef([0, 0]);
  // matrices for rotation and translation
  [this.rotationMatrix, this.setRotationMatrix] = useState(identity(2, 2));
  [this.translationMatrix, this.setTranslationMatrix] = useState(zeros(this.vertices.size()));
};

// rotates the svg in radians
GameObject.prototype.rotate = function (angleInRadians) {
  this.rotation.current = angleInRadians;
  this.setRotationMatrix(
    matrix([
      [cos(angleInRadians), -sin(angleInRadians)],
      [sin(angleInRadians), cos(angleInRadians)],
    ])
  );
};

// translates the game object by the specified offset
GameObject.prototype.translate = function (offsetX, offsetY) {
  this.position.current = [this.position.current[0] + offsetX, this.position.current[1] + offsetY];
  this.setTranslationMatrix(
    matrix(
      // get number of rows in matrix and set x/y position for each row
      [...Array(this.vertices.size()[0]).keys()].map((rowIndex) => {
        return [this.position.current[0] + offsetX, this.position.current[1] + offsetY];
      })
    )
  );
};

// set the absolute position of the game object
GameObject.prototype.setAbsolutePosition = function (posX, posY) {
  this.position.current = [posX, posY];
  this.setTranslationMatrix(
    matrix(
      // get number of rows in matrix and set x/y position for each row
      [...Array(this.vertices.size()[0]).keys()].map((rowIndex) => {
        return [posX, posY];
      })
    )
  );
};

// return the coordinates of the svg in polygon point format
GameObject.prototype.getSVGCoords = function () {
  // could use a regex here
  let svgCoords = this.transformation.current.format().replaceAll('],', '');
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
