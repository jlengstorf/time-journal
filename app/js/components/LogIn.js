import React from 'react';
import bemmit from '../util/bemmit';

const getClass = bemmit('auth-form');

const Login = props => (
  <form className={`auth__form ${getClass(null, ['log-in'])}`}
        onSubmit={props.submitCB}>
    <h2 className={getClass('heading')}>Log In to Your Account</h2>
    <div className={getClass('input-group')}>
      <label htmlFor='log-in-email'
             className={`u-label ${getClass('label')}`}>
        Email
      </label>
      <input type='email' id='log-in-email' name='email'
             className={`u-input ${getClass('input', ['email'])}`} />
    </div>
    <div className={getClass('input-group')}>
      <label htmlFor='log-in-password'
             className={`u-label ${getClass('label')}`}>
        Password
      </label>
      <input type='password' id='log-in-password' name='password'
             className={`u-input ${getClass('input', ['password'])}`} />
    </div>
    <input type='submit' name='submit' value='Log In'
           className={`u-button ${getClass('submit')}`} />
  </form>
);

Login.defaultProps = {
  submitCB: () => {},
};

Login.propTypes = {
  submitCB: React.PropTypes.func.isRequired,
};

export default Login;
