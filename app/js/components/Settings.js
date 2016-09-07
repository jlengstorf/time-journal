import React from 'react';
import Navigation from './Navigation';
import bemmit from '../util/bemmit';

const getClass = bemmit('settings');

const Settings = props => (
  <div className={`app-shell__main ${getClass()}`}>
    <h1>Settings</h1>
    <a href="#log-out" onClick={props.route.handleLogOut}
       className={getClass('log-out')}>log out</a>
    <Navigation />
  </div>
);

export default Settings;
