import React, { useState, useRef } from 'react';
import { matrix, multiply, cos, sin } from 'mathjs';

// functional prototype class for all game objects
const GameObject = function (vertices) {
  this.vertices = matrix(vertices);
  // the transformed coordinates
  [this.transformation, this.setTransformation] = useState(this.vertices);
  // current rotation in radians (maintain value between function calls without triggering re-render)
  this.rotation = useRef(0);
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

// return the coordinates of the svg in polygon point format
GameObject.prototype.getSVGCoords = function () {
  let svgCoords = this.transformation.format().replaceAll('],', '');
  svgCoords = svgCoords.replaceAll('[', '');
  svgCoords = svgCoords.replaceAll(']', '');
  svgCoords = svgCoords.replaceAll(', ', ',');
  return svgCoords;
};

GameObject.prototype.render = function () {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points={this.getSVGCoords()} fill="none" stroke="black" />
    </svg>
  );
};

export default GameObject;
