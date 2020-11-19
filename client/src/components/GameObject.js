import { matrix, cos, sin } from 'mathjs';

export default GameObject = (vertices) => {
  this._matrix = matrix(vertices);
};

GameObject.prototype.rotate = (angleInRadians) => {
  const rotationMatrix = matrix([
    [cos(angleInRadians), -sin(angleInRadians), sin(angleInRadians), cos(angleInRadians)],
  ]);
  console.log(this._matrix.multiply(rotationMatrix));
};
