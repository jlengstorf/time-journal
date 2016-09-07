import React from 'react';
import { Link } from 'react-router';
import { bemmitArr } from '../util/bemmit';

const NavLink = props => {

  // TODO Make bemmit handle this to avoid this jiggery-pokery.
  const getClassArray = bemmitArr(props.className.split(' ')[0]);
  const activeClass = getClassArray(null, ['active'])[1];
  return (
    <Link {...props} activeClassName={activeClass} />
  );
};

export default NavLink;
