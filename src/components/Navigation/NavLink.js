import React from 'react';
import { IndexLink, Link } from 'react-router';

export const NavLink = props => {
  const activeClass = `${props.className.split(' ')[0]}--active`;
  const LinkType = props.to.match(/^\/$/) ? IndexLink : Link;
  return <LinkType {...props} activeClassName={activeClass} />;
};

NavLink.propTypes = {
  activeClass: React.PropTypes.string,
  className: React.PropTypes.string,
  to: React.PropTypes.string.isRequired
};

export default NavLink;
