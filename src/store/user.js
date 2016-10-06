import { browserHistory } from 'react-router';

const debug = require('debug')('app:store:user');
const PouchDB = require('pouchdb');

// Add authentication support.
PouchDB.plugin(require('pouchdb-authentication'));

// TODO Make these configurable through .env or something similar.
export const db = new PouchDB('time-journal');
export const remoteDB = new PouchDB('http://127.0.0.1:5984/_utils', {
  skipSetup: true,
});

let isSyncing = false;

// TODO create user accounts
export const USER_CREATE = 'USER_CREATE';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SET_DETAILS = 'USER_SET_DETAILS';
export const USER_GET_STATUS = 'USER_GET_STATUS';
export const USER_UPDATE_STATUS = 'USER_UPDATE_STATUS';

export function createUser(user) {
  return {
    type: USER_CREATE,
    payload: {
      username: user.username,
      password: user.password,
      displayName: user.displayName,
      imageUrl: user.imageUrl,
      email: user.email,
    },
  };
}

export function getLoginStatus() {
  return {
    type: USER_GET_STATUS,
  };
}

export function updateLoginStatus(isLoggedIn) {
  return {
    type: USER_UPDATE_STATUS,
    payload: {
      isLoggedIn,
    },
  };
}

export function updateUser(user) {
  return {
    type: USER_SET_DETAILS,
    payload: {
      ...user,
      isLoggedIn: !!user.name,
    },
  }
}

export const handleSignup = (user) => {
  return (dispatch) => {
    dispatch(createUser(user));

    return handleLogin(user.username, user.password);
  }
};

function getUserDatabaseName(username) {
  return [].reduce.call(username, (hex, i) => {
    return `${hex}${i.charCodeAt(0).toString(16)}`;
  }, 'userdb-');
}

export function startDatabaseSync(username) {
  debug('startDatabaseSync() called.');
  if (!isSyncing) {
    const userDatabaseName = getUserDatabaseName(username);
    debug(`userDatabaseName: ${userDatabaseName}`);

    const userDB = new PouchDB(`http://127.0.0.1:5984/${userDatabaseName}`);

    db.sync(userDB, {
      live: true,
      retry: true,
    }).on('error', debug);

    isSyncing = true;
  }
}

export const handleLogin = (username, password) => {
  return (dispatch) => {
    debug(username);
    debug(password);
    dispatch(userLogin(username, password));

    return new Promise(resolve => {
      remoteDB.getUser(username)
        .then(user => {
          dispatch(updateUser(user));
          browserHistory.push('/journal');
          startDatabaseSync(user.name);
          resolve();
        })
        .catch(error => { debug('remoteDB.getUser() error: ', error); });
    });
  }
}

export const handleStatusCheck = () => {
  return (dispatch) => {
    dispatch(getLoginStatus());

    return new Promise(resolve => {
      remoteDB.getSession()
        .then(response => response.userCtx)
        .then(user => {
          dispatch(updateLoginStatus(!!user.name));
          startDatabaseSync(user.name);
          resolve();
        })
        .catch(debug);
    });
  }
};

export function userLogin(username = '', password = '') {
  return {
    type: USER_LOGIN,
    payload: {
      username,
      password,
    },
  };
};

const initialState = {
  imageUrl: null,
  displayName: null,
  username: null,
  email: null,
  isLoggedIn: false,
  pending: false,
};

const USER_ACTION_HANDLERS = {
  [USER_LOGIN]: (state, action) => {
    remoteDB.login(action.payload.username, action.payload.password)
      .catch(error => debug('remoteDB.login() error', error));

    return ({
      ...state,
      pending: true,
    });
  },
  [USER_LOGOUT]: (state, action) => {
    remoteDB.logout()
      .catch(debug);

    return initialState;
  },
  [USER_CREATE]: (state, action) => {
    const user = action.payload;

    remoteDB.signup(user.username, user.password, {
      metadata: {
        email: user.email,
        imageUrl: user.imageUrl,
        displayName: user.displayName,
      },
    }).catch(debug);

    return state;
  },
  [USER_GET_STATUS]: (state) => ({
    ...state,
    pending: true,
  }),
  [USER_UPDATE_STATUS]: (state, action) => ({
    ...state,
    isLoggedIn: action.payload.isLoggedIn,
    pending: false,
  }),
  [USER_SET_DETAILS]: (state, action) => {
    const { email, displayName, imageUrl } = action.payload;

    return {
      email,
      displayName,
      imageUrl,
      username: action.payload.name,
      isLoggedIn: true,
      pending: false,
    };
  },
};

export default function userReducer(state = initialState, action) {
  const handler = USER_ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
