import React from 'react';
import bemmit from 'bemmit';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

import '../../styles/core.css';
import './CoreLayout.css';

const getClass = bemmit('app-shell');

export const CoreLayout = ({ children }) => (
  <div className={getClass()}>
    <Header className={getClass('header')} />
    <div className={getClass('main')}>
      {children}
    </div>
    <Navigation className={getClass('navigation')} />
  </div>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
