import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Controller from './Controller.js';
import Ship from './Ship.jsx';

const App = () => {
  const Input = new Controller();
  return <Ship />;
};

ReactDOM.render(<App />, document.getElementById('app'));
