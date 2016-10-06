import React from 'react';
import bemmit from 'bemmit';

import './UserInfo.css';

const getClass = bemmit('user-info');

export const UserInfo = (props) => (
  <div className={getClass()}>
    <figure className={getClass('image-wrap')}>
      <img className={getClass('image')}
           src={props.imageUrl}
           alt={props.displayName} />
    </figure>
    <p className={getClass('details')}>
      {props.displayName}
      <span className={getClass('email')}>{props.email}</span>
    </p>
  </div>
);

UserInfo.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
  displayName: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
};

export default UserInfo;
