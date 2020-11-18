import React from 'react';
import styled from 'styled-components';
import Controller from './Controller';
import Ship from './Ship';

const App = () => {
  const Input = new Controller();
  return (
    <div className="app">
      <Ship />
    </div>
  );
};

export default App;
