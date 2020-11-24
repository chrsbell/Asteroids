import React from 'react';
import Ship from './Ship.jsx';
function Game() {
  this.objects = [new Ship()];
  return this.objects;
}

Game.prototype.render = function () {
  return this.objects;
};

Game.prototype.addObject = function (obj) {
  this.objects.push(obj);
};

export default Game;
