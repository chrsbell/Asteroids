import React, { useState, useRef } from 'react';
import { matrix, multiply, add, cos, sin } from 'mathjs';

// functional prototype class for all game objects
const GameObject = function (vertices) {
  this.vertices = matrix(vertices);
  // the transformed coordinates
  [this.transformation, this.setTransformation] = useState(this.vertices);
  // current rotation in radians (maintain value between function calls without triggering re-render)
  this.rotation = useRef(0);
  // current position of object
  this.position = useRef([0, 0]);
};

// rotates the svg in radians
GameObject.prototype.rotate = function (angleInRadians) {
  this.rotation.current = angleInRadians;
  const rotationMatrix = matrix([
    [cos(angleInRadians), -sin(angleInRadians)],
    [sin(angleInRadians), cos(angleInRadians)],
  ]);
  this.setTransformation(multiply(this.vertices, rotationMatrix));
};

// translates the game object by the specified offset
GameObject.prototype.translate = function (offsetX, offsetY) {
  this.position.current[0] += offsetX;
  this.position.current[1] += offsetY;
  const translation = matrix(
    // get number of rows in matrix and set x/y position
    [...Array(this.vertices.size()[0]).keys()].map((rowIndex) => {
      return [
        this.vertices.get([rowIndex, 0]) + this.position.current[0],
        this.vertices.get([rowIndex, 1]) + this.position.current[1],
      ];
    })
  );
  this.setTransformation(translation);
};

// return the coordinates of the svg in polygon point format
GameObject.prototype.getSVGCoords = function () {
  let svgCoords = this.transformation.format().replaceAll('],', '');
  svgCoords = svgCoords.replaceAll('[', '');
  svgCoords = svgCoords.replaceAll(']', '');
  svgCoords = svgCoords.replaceAll(', ', ',');
  return svgCoords;
};

// renders the react component
GameObject.prototype.render = function () {
  return (
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <polygon points={this.getSVGCoords()} fill="none" stroke="black" />
    </svg>
  );
};

export default GameObject;
