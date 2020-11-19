import React from 'react';
import { matrix, multiply, cos, sin } from 'mathjs';

class GameObject extends React.Component {
  constructor({ vertices }) {
    super();
    this.vertices = matrix(vertices);
    // the transformed coordinates
    this.state = {
      transformation: this.vertices,
    };
    // current rotation in radians
    this.rotation = 0;
  }

  // rotates the svg in radians
  rotate(angleInRadians) {
    this.rotation = angleInRadians;
    const rotationMatrix = matrix([
      [cos(angleInRadians), -sin(angleInRadians)],
      [sin(angleInRadians), cos(angleInRadians)],
    ]);
    this.setState({
      transformation: multiply(this.vertices, rotationMatrix),
    });
  }

  // return the coordinates of the svg in polygon point format
  getSVGCoords() {
    let svgCoords = this.state.transformation.format().replaceAll('],', '');
    svgCoords = svgCoords.replaceAll('[', '');
    svgCoords = svgCoords.replaceAll(']', '');
    svgCoords = svgCoords.replaceAll(', ', ',');
    return svgCoords;
  }

  render() {
    return (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points={this.getSVGCoords()} fill="none" stroke="black" />
      </svg>
    );
  }
}

export default GameObject;
