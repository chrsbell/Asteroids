// import GameObject from './GameObject.jsx';

// const Asteroid = function () {
//   // this looks like a hexagon
//   const vertices = [
//     [10, 0, 1],
//     [20, 0, 1],

//     [30, 10, 1],
//     [30, 20, 1],

//     [20, 30, 1],
//     [10, 30, 1],

//     [0, 20, 1],
//     [0, 10, 1],
//   ];
//   GameObject.call(this, vertices, { width: 30, height: 30 });
//   useEffect(() => {
//     const randX = Math.round(Math.random() * gameState.screen.width);
//     const randY = Math.round(Math.random() * gameState.screen.height);
//     this.setAbsolutePosition(randX, randY);
//   }, []);
//   return [this, this.render()];
// };

// Asteroid.prototype.constructor = Asteroid;
// Asteroid.prototype = Object.create(GameObject.prototype);

// export default Asteroid;