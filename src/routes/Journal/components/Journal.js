import React from 'react';
import bemmit from 'bemmit';
import { Map } from 'immutable';

import './Journal.css';

const debug = require('debug')('app:routes:Journal:components:Journal');

const getClass = bemmit('journal');

const handleSubmit = (handler, event) => {
  event.preventDefault();
  const form = document.getElementById('entry-form');
  const data = new FormData(form);

  const entry = {
    description: data.get('entry'),
    date: Date.now(),
  };

  debug(entry);

  handler(entry);
};

export const Journal = (props) => (
  <div className={getClass()}>
    <h1>Journal</h1>
    <form id='entry-form' onSubmit={handleSubmit.bind(null, props.saveJournalEntry)}>
      <p>Add an entry</p>
      <input type='text' name='entry' id='entry' />
      <button type='submit'>Add</button>
    </form>
    <ul>
      {props.journal.get('entries').map(entry => (
        <li key={entry.date}>{entry.description}</li>
      ))}
    </ul>
    {debug(props)}
  </div>
);

Journal.propTypes = {
  user: React.PropTypes.object,
  journal: React.PropTypes.instanceOf(Map),
  saveJournalEntry: React.PropTypes.func.isRequired,
};

export default Journal;
