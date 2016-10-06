import React from 'react';
import bemmit from 'bemmit';
import NavLink from './NavLink';

import './Navigation.css';

const getClass = bemmit('navigation');

export const Navigation = (props) => (
  <nav className={`${props.className} ${getClass()}`}>
    <NavLink to='/journal' className={getClass('link', ['journal'])}>
      Journal
    </NavLink>
    <NavLink to='/counter' className={getClass('link', ['trends'])}>
      Counter
    </NavLink>
    <NavLink to='/zen' className={getClass('link', ['settings'])}>
      Zen
    </NavLink>
  </nav>
);

Navigation.propTypes = {
  className: React.PropTypes.string,
};

export default Navigation;
