import { persistentReducer } from 'redux-pouchdb-plus';
import { fromJS } from 'immutable';

const debug = require('debug')('app:routes:Journal:modules:journal');

export const SAVE_JOURNAL_ENTRY = 'SAVE_JOURNAL_ENTRY';

export function saveJournalEntry(entry) {
  return {
    type: SAVE_JOURNAL_ENTRY,
    payload: {
      ...entry,
    },
  };
}

export const actions = {
  saveJournalEntry,
};

const initialState = fromJS({ entries: [] });
const JOURNAL_ACTION_HANDLERS = {
  [SAVE_JOURNAL_ENTRY]: (state, { payload }) => {
    debug(`current state: ${JSON.stringify(state)}`);
    const newState = state.update('entries', entries => entries.push(payload));
    debug(`next state: ${JSON.stringify(newState)}`);
    return newState;
  },
};

function journalReducer(state = initialState, action) {
  const handler = JOURNAL_ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export default persistentReducer(journalReducer);
