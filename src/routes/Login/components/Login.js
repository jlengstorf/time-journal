import React from 'react';
import bemmit from 'bemmit';
import { browserHistory } from 'react-router';

const debug = require('debug')('app:routes:Login:components:Login');

const getClass = bemmit('login');

const handleSignup = (handler, event) => {
  event.preventDefault();
  const form = document.getElementById('signup-form');
  const data = new FormData(form);

  const user = {
    username: data.get('username'),
    password: data.get('password'),
    displayName: data.get('displayName'),
    imageUrl: data.get('imageUrl'),
    email: data.get('email'),
  };

  debug(user);

  handler(user);
};

const handleLogin = (handler, event) => {
  event.preventDefault();

  const form = document.getElementById('login-form');
  const data = new FormData(form);

  handler(data.get('username'), data.get('password'));
};

export const Login = (props) => {
  return (
    <div className='login-forms'>
      <form className={getClass()} id='signup-form'
            onSubmit={handleSignup.bind(null, props.handleSignup)}>
        <div className={getClass('input-group')}>
          <label htmlFor='username' className={`u-form-label ${getClass('label')}`}>
            Choose a Username
          </label>
          <input type='text' id='username' name='username'
                 pattern='^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$'
                 className={`u-form-input ${getClass('input', ['text'])}`} />
        </div>
        <div className={getClass('input-group')}>
          <label htmlFor='password' className={`u-form-label ${getClass('label')}`}>
            Choose a Password
          </label>
          <input type='password' id='password' name='password'
                 className={`u-form-input ${getClass('input', ['password'])}`} />
        </div>
        <div className={getClass('input-group')}>
          <label htmlFor='displayName' className={`u-form-label ${getClass('label')}`}>
            Display Name
          </label>
          <input type='text' id='displayName' name='displayName'
                 className={`u-form-input ${getClass('input', ['displayName'])}`} />
        </div>
        <div className={getClass('input-group')}>
          <label htmlFor='imageUrl' className={`u-form-label ${getClass('label')}`}>
            Image URL
          </label>
          <input type='text' id='imageUrl' name='imageUrl'
                 className={`u-form-input ${getClass('input', ['imageUrl'])}`} />
        </div>
        <div className={getClass('input-group')}>
          <label htmlFor='email' className={`u-form-label ${getClass('label')}`}>
            Email
          </label>
          <input type='email' id='email' name='email'
                 className={`u-form-input ${getClass('input', ['email'])}`} />
        </div>
        <button className={`u-form-submit ${getClass('submit')}`}>
          Sign Up
        </button>
      </form>
      <form className={getClass()} id='login-form'
            onSubmit={handleLogin.bind(null, props.handleLogin)}>
        <div className={getClass('input-group')}>
          <label htmlFor='username' className={`u-form-label ${getClass('label')}`}>
            Username
          </label>
          <input type='text' id='username' name='username'
                 pattern='^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$'
                 className={`u-form-input ${getClass('input', ['text'])}`} />
        </div>
        <div className={getClass('input-group')}>
          <label htmlFor='password' className={`u-form-label ${getClass('label')}`}>
            Password
          </label>
          <input type='password' id='password' name='password'
                 className={`u-form-input ${getClass('input', ['password'])}`} />
        </div>
        <button className={`u-form-submit ${getClass('submit')}`}>
          Log In
        </button>
      </form>
      <pre>{JSON.stringify(props.user, null, '  ')}</pre>
    </div>
  );
};

Login.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object,
  handleLogin: React.PropTypes.func.isRequired,
  handleSignup: React.PropTypes.func.isRequired,
};

export default Login;
