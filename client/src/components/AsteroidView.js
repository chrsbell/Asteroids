// import React, { useContext, useEffect, useRef } from 'react';
// import { GameContext } from './State.js';
// import Asteroid from './Asteroid.jsx';

// // the container for all asteroids in the game
// const AsteroidView = () => {
//   const { gameState, dispatch } = useContext(GameContext);
//   let [testAsteroid, testAsteroidRender] = new Asteroid();
//   useEffect(() => {
//     console.log('Asteroid View mounted');
//     dispatch({ type: 'asteroid', asteroid: testAsteroid });
//   }, []);
//   useEffect(() => {
//     console.log(`Asteroid count: ${gameState.objects.asteroids.length}`);
//   }, [gameState.objects.asteroids.length]);

//   return testAsteroidRender;
// };

// export default AsteroidView;