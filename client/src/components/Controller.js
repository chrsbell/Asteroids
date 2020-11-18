import $ from 'jquery';

export default class Controller {
  constructor() {
    $(window).on('mousedown', (e) => {
      // prevent event from triggering twice
      e.stopImmediatePropagation();
      e.preventDefault();
      console.log('Mouse pressed!');
    });
    $(window).on('mouseup', (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      console.log('Mouse released!');
    });
    $(window).on('keypress', (e) => {
      // use key code to check space bar
      e.stopImmediatePropagation();
      if (e.keyCode === 32) {
        console.log('Space pressed!');
      }
    });
    $(window).on('keyup', (e) => {
      // use key code to check space bar
      if (e.keyCode === 32) {
        e.stopImmediatePropagation();
        console.log('Space released!');
      }
    });
  }
}
