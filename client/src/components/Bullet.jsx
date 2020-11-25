import React, { useEffect } from 'react';
import GameObject from './GameObject.jsx';

const Bullet = function () {};

Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;
