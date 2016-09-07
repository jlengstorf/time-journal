import React from 'react';
import bemmit from '../util/bemmit';

const getClass = bemmit('auth-form');

const SignUp = props => (
  <form className={`auth__form ${getClass(null, ['sign-up'])}`}
        onSubmit={props.submitCB}>
    <h2 className={getClass('heading')}>Create Your Free Account</h2>
    <div className={getClass('input-group')}>
      <label htmlFor='sign-up-name'
             className={`u-label ${getClass('label')}`}>
        What Should We Call You?
      </label>
      <input type='text' id='sign-up-name' name='name'
             className={`u-input ${getClass('input', ['name'])}`} />
    </div>
    <div className={getClass('input-group')}>
      <label htmlFor='sign-up-email'
             className={`u-label ${getClass('label')}`}>
        Enter Your Email
      </label>
      <input type='email' id='sign-up-email' name='email'
             className={`u-input ${getClass('input', ['email'])}`} />
    </div>
    <div className={getClass('input-group')}>
      <label htmlFor='sign-up-password'
             className={`u-label ${getClass('label')}`}>
        Choose a Password
      </label>
      <input type='password' id='sign-up-password' name='password'
             className={`u-input ${getClass('input', ['password'])}`} />
    </div>
    <input type='submit' name='submit' value='Create Your Account'
           className={`u-button ${getClass('submit')}`} />
  </form>
);

SignUp.defaultProps = {
  submitCB: () => {},
};

SignUp.propTypes = {
  submitCB: React.PropTypes.func.isRequired,
};

export default SignUp;
