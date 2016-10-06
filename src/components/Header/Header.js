import React from 'react';
import bemmit from 'bemmit';
import UserInfo from '../../containers/UserInfoContainer';

import './Header.css';

const getClass = bemmit('header');

export const Header = (props) => (
  <header className={`${props.className} ${getClass()}`}>
    <UserInfo />
  </header>
);

Header.propTypes = {
  className: React.PropTypes.string,
};

export default Header;
