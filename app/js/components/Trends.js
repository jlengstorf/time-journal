import React from 'react';
import Navigation from './Navigation';

import bemmit from '../util/bemmit';

const getClass = bemmit('trends');

const Trends = props => (
  <div className={`app-shell__main ${getClass()}`}>
    <h1>Trends</h1>
    <Navigation />
  </div>
);

export default Trends;
