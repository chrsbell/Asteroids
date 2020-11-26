import React, { useContext, useEffect } from 'react';
import { GameContext } from './GameContext.jsx';
import Asteroid from './Asteroid.jsx';

// the container for all asteroids in the game
const AsteroidView = () => {
  const { gameState, dispatch } = useContext(GameContext);
  let testAsteroid = new Asteroid();
  useEffect(() => {
    dispatch({ type: 'asteroid', asteroid: testAsteroid });
  }, []);
  useEffect(() => {
    console.log(`Asteroid count: ${gameState.objects.asteroids.length}`);
  }, [gameState.objects.asteroids.length]);
  return testAsteroid;
};

export default AsteroidView;
