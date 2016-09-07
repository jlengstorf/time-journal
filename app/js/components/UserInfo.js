import React from 'react';
import bemmit from '../util/bemmit';

const UserInfo = props => {
  const getClass = bemmit('user-info');

  return (
    <div className={`app-shell__header ${getClass()}`}>
      <figure className={getClass('image-wrap')}>
        <img className={getClass('image')}
             src="//placekitten.com/80/80"
             alt={props.user.displayName} />
      </figure>
      <p className={getClass('details')}>
        {props.user.displayName}
        <span className={getClass('email')}>{props.user.email}</span>
      </p>
    </div>
  );
};

export default UserInfo;
