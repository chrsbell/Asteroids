import React, { useState, useContext } from 'react';
import { GameContext } from './GameContext.jsx';
import Bullet from './Bullet.jsx';

const BulletView = function () {
  const { gameState, dispatch } = useContext(GameContext);
  this.createBullet = this.createBullet.bind(this, dispatch);
  [this.bulletReady, this.setBulletReady] = useState(false);
  let GeneratedBullet = new Bullet(0, 0, 0);
  if (gameState.bullet.params) {
    debugger;
    GeneratedBullet = new Bullet(...gameState.bullet.params);
    dispatch({ type: 'generateBullet', params: null });
    dispatch({ type: 'addBullet', bullet: GeneratedBullet });
  }
};

BulletView.prototype.createBullet = function (dispatch, x, y, rotation) {
  debugger;
  dispatch({
    type: 'generateBullet',
    params: [x, y, rotation],
  });
  this.setBulletReady(!this.bulletReady);
};

export default BulletView;
