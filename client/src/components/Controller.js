import $ from 'jquery';

export default class Controller {
  constructor(callbacks) {
    $(window).on('mousemove', (e) => {
      // prevent event from triggering multiple times
      e.stopImmediatePropagation();
      e.preventDefault();
      callbacks['mousemove'].forEach((callback) => {
        callback(e);
      });
    });
    $(window).on('mousedown', (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      callbacks['mousedown'].forEach((callback) => {
        callback(e);
      });
      console.log('Mouse pressed!');
    });
    $(window).on('mouseup', (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      callbacks['mouseup'].forEach((callback) => {
        callback();
      });
      console.log('Mouse released!');
    });
    $(window).on('keypress', (e) => {
      // use key code to check space bar
      e.stopImmediatePropagation();
      if (e.keyCode === 32) {
        console.log('Space pressed!');
      }
      callbacks['keypress'].forEach((callback) => {
        callback();
      });
    });
    $(window).on('keyup', (e) => {
      // use key code to check space bar
      e.stopImmediatePropagation();
      if (e.keyCode === 32) {
        console.log('Space released!');
      }
      callbacks['keyup'].forEach((callback) => {
        callback();
      });
    });
  }
}
