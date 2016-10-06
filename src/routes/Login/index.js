import { browserHistory } from 'react-router';
import { injectReducer } from '../../store/reducers';
import { remoteDB, updateUser, startDatabaseSync } from '../../store/user';

const debug = require('debug')('app:routes:Login');

export default (store) => ({
  path: 'login',
  onEnter(nextState, replace) {
    if (store.getState().user.isLoggedIn) {
      debug('User is already logged in.');
      replace('/journal');
      return;
    }

    remoteDB.getSession()
      .then(response => response.userCtx)
      .then(user => {
        debug(`remoteDB.getSession() -> ${JSON.stringify(user)}`);
        if (!!user.name) {
          debug('Should be redirecting now...');
          remoteDB.getUser(user.name)
            .then(user => {
              startDatabaseSync(user.name)
              return store.dispatch(updateUser(user));
            })
            .then(response => {
              debug(response);
              browserHistory.push('/journal');
            });
        }
      });
  },
  getComponent(nextState, next) {
    require.ensure([
      './containers/LoginContainer',
      '../../store/user',
    ], (require) => {
      const Login = require('./containers/LoginContainer').default;
      const userReducer = require('../../store/user').default;

      injectReducer(store, {
        key: 'user',
        reducer: userReducer,
      });

      next(null, Login);
    });
  },
});
