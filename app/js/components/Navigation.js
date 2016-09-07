import React from 'react';
import bemmit from '../util/bemmit';

import NavLink from './NavLink';

const Navigation = props => {
  const getClass = bemmit('app-nav');

  return (
    <nav className={`app-shell__nav ${getClass()}`}>
      <NavLink to="/" className={getClass('link', ['journal'])}>
        Time Journal
      </NavLink>
      <NavLink to="/trends" className={getClass('link', ['trends'])}>
        Trends
      </NavLink>
      <NavLink to="/settings" className={getClass('link', ['settings'])}>
        Settings
      </NavLink>
    </nav>
  );
}

export default Navigation;
