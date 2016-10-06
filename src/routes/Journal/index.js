import { injectReducer } from '../../store/reducers';

const debug = require('debug')('app:routes:Journal');

export default (store) => ({
  path: 'journal',
  onEnter (nextState, replace) {
    if (!store.getState().user.isLoggedIn) {
      replace(`/login`);
    }
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/JournalContainer',
      './modules/journal',
    ], (require) => {
      const Journal = require('./containers/JournalContainer').default;
      const journalReducer = require('./modules/journal').default;

      injectReducer(store, {
        key: 'journal',
        reducer: journalReducer,
      });

      next(null, Journal);
    });
  },
});
