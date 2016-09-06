import React from 'react';
import bemmit from '../util/bemmit';
import firebase from '../helper/firebase';

const handleLogOut = event => {
  event.preventDefault();

  firebase.auth().signOut();
};

const Main = props => {
  const getClass = bemmit('app-shell');
  return (
    <div className={getClass()}>
      <a href="#log-out" onClick={handleLogOut}>log out</a>
    </div>
  );
};

export default Main;
