import { combineReducers } from 'redux';
import userReducer from './user';
import locationReducer from './location';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    user: userReducer,
    location: locationReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
