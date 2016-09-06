import React from 'react';
import bemmit from '../util/bemmit';
import firebase from '../helper/firebase';

import Login from './Login';
import SignUp from './SignUp';

const handleSignUp = event => {
  event.preventDefault();

  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
    if (!user.emailVerified) {
      user.sendEmailVerification();
    }
  });
};

const handleLogIn = event => {
  event.preventDefault();

  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
    if (!user.emailVerified) {
      user.sendEmailVerification();
    }
  });
};

const getAuthForms = (visibleForm, toggleVisibleForm) => {
  const getClass = bemmit('auth');
  const isLogin = visibleForm === 'log-in';
  return (
    <main className={getClass('main')}>
      <nav className={getClass('options')}>
        <a href="#sign-up" onClick={toggleVisibleForm.bind(null, 'sign-in')}
           className={getClass('option', ['sign-up', (!isLogin && 'active')])}>
          Sign Up
        </a>
        <a href="#log-in" onClick={toggleVisibleForm.bind(null, 'log-in')}
           className={getClass('option', ['log-in', (isLogin && 'active')])}>
          Log In
        </a>
      </nav>
      {isLogin ? <Login submitCB={handleLogIn} /> : <SignUp submitCB={handleSignUp} />}
    </main>
  );
}

const Auth = props => {
  const getClass = bemmit('auth');

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <h1 className={getClass('heading')}>Time Journal</h1>
        <p className={getClass('lede')}>
          Tagline goes here. Let’s assume it’ll span two lines of text or so.
        </p>
      </header>
      {getAuthForms(props.visibleForm, props.toggleVisibleForm)}
    </div>
  );
};

Auth.propTypes = {
  visibleForm: React.PropTypes.string.isRequired,
  toggleVisibleForm: React.PropTypes.func.isRequired,
};

export default Auth;
