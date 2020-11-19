import { matrix, cos, sin } from 'mathjs';

// function GameObject(vertices) {
//   this.matrix = matrix(vertices);
// }

// GameObject.prototype.rotate = (angleInRadians) => {
//   const rotationMatrix = matrix([
//     [cos(angleInRadians), -sin(angleInRadians), sin(angleInRadians), cos(angleInRadians)],
//   ]);
//   const newMatrix = this.matrix.multiply(rotationMatrix);
//   console.log(newMatrix);
//   this.setMatrix(newMatrix);
// };

// GameObject.prototype.getSVGCoords = () => {
//   // debugger;
//   // console.log(JSON.stringify(this));
//   let svgCoords = this.matrix.format().replaceAll('],', '');
//   svgCoords = svgCoords.replaceAll('[', '');
//   return svgCoords;
// };

class GameObject {
  constructor(vertices) {
    this.matrix = matrix(vertices);
  }

  rotate(angleInRadians) {
    const rotationMatrix = matrix([
      [cos(angleInRadians), -sin(angleInRadians), sin(angleInRadians), cos(angleInRadians)],
    ]);
    this.matrix = this.matrix.multiply(rotationMatrix);
  }

  getSVGCoords() {
    let svgCoords = this.matrix.format().replaceAll('],', '');
    svgCoords = svgCoords.replaceAll('[', '');
    svgCoords = svgCoords.replaceAll(']', '');
    svgCoords = svgCoords.replaceAll(', ', ',');
    return svgCoords;
  }
}

export default GameObject;
