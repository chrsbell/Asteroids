import $ from 'jquery';

class Controller {
  constructor() {
    this.callbacks = { mousemove: [], keypress: [] };
    /*
    $(window).on('mousedown', (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      callbacks['mousedown'].forEach((callback) => {
        callback(e);
      });
    });
    $(window).on('mouseup', (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      callbacks['mouseup'].forEach((callback) => {
        callback();
      });
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
    });*/
  }
  addCallback(type, callback, keyCode) {
    this.callbacks[type].push(callback);
    console.log(this.callbacks.mousemove.length);
    $(window).on(type, (e) => {
      e.stopImmediatePropagation();
      if (keyCode) {
        if (e.keyCode === keyCode) {
          callback(e);
        }
      } else {
        callback(e);
      }
    });
  }
}

export default new Controller();
