import React, { useEffect, useContext } from 'react';
import Controller from './Controller.js';
import GameObject from './GameObject.jsx';

const Bullet = function () {
  useEffect(() => {
    Controller.addCallback('keypress', this.shoot, 32);
    Controller.addCallback('mousemove', this.rotateToCursor);
    this.setAbsolutePosition(this.screen.width / 2, this.screen.height / 2);
  }, []);
};

Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;
