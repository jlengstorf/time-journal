import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import bemmit from '../util/bemmit';
import firebase from '../helper/firebase';

import UserInfo from './UserInfo';
import Journal from './Journal';
import Trends from './Trends';
import Settings from './Settings';

const handleLogOut = event => {
  event.preventDefault();

  firebase.auth().signOut();
};

const Main = props => {
  const getClass = bemmit('app-shell');
  return (
    <div className={getClass()}>
      <UserInfo user={props.user} />
      <Router history={browserHistory}>
        <Route path="/"  component={Journal} />
        <Route path="trends" component={Trends} />
        <Route path="settings" component={Settings} />
      </Router>
    </div>
  );
};

export default Main;
