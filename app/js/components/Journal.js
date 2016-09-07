import React, {Component} from 'react';
import Navigation from './Navigation';
import moment from 'moment';
import bemmit from '../util/bemmit';
import firebase from '../helper/firebase';

export default class Journal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      loading: true,
    };

    this.handleEntryUpdate = snapshot => {
      this.setState({
        entries: snapshot.val(),
        loading: false,
      });
    };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    this.entriesRef = firebase.database().ref(`entries/${uid}`);

    this.entriesRef.on('value', this.handleEntryUpdate);
  }

  componentWillUnmount() {
    this.entriesRef.off();
  }

  handleAddEntry(entry) {
    const entryRef = this.entriesRef.push();

    entryRef.set(entry).then(entry => {
      console.log('new entry saved!');
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const inputs = event.target.elements;
    const date = inputs.date.value;
    const start = inputs.start.value;
    const end = inputs.end.value;
    const description = inputs.description.value;

    const entry = {
      start: Date.parse(`${date} ${start}`),
      end: Date.parse(`${date} ${end}`),
      description: event.target.elements.description.value,
    };

    this.handleAddEntry(entry);
  }

  handleRemoveEntry(entryID) {

    this.setState({
      entries: this.state.entries.filter(entry => entry.id !== entryID),
    });
  }

  render() {
    const getClass = bemmit('journal');
    const entries = this.state.entries;
    const keys = Object.keys(entries);
    const entryComponents = keys.map(key => {
      const entry = entries[key];
      const start = moment(entry.start);
      const end = moment(entry.end);

      return (
        <tr key={key}>
          <td>{`${start.format('LT')}`}</td>
          <td>{`${end.format('LT')}`}</td>
          <td>{entry.description}</td>
        </tr>
      );
    });

    return (
      <div className={`app-shell__main ${getClass()}`}>
        <h1 className={`u-heading ${getClass('heading')}`}>Track Your Time</h1>
        <form className={getClass('form')} onSubmit={this.handleSubmit.bind(this)}>
          <div className={getClass('input-group', ['one-third'])}>
            <label htmlFor='journal-date'
                   className={`u-label ${getClass('label')}`}>
              Date
            </label>
            <input type='date' id='journal-date' name='date'
                   className={`u-input ${getClass('input', ['date'])}`}
                   defaultValue={moment().format('YYYY-MM-DD')} />
          </div>
          <div className={getClass('input-group', ['one-third'])}>
            <label htmlFor='journal-start'
                   className={`u-label ${getClass('label')}`}>
              Start Time
            </label>
            <input type='time' id='journal-start' name='start'
                   className={`u-input ${getClass('input', ['start'])}`} />
          </div>
          <div className={getClass('input-group', ['one-third'])}>
            <label htmlFor='journal-end'
                   className={`u-label ${getClass('label')}`}>
              End Time
            </label>
            <input type='time' id='journal-end' name='end'
                   className={`u-input ${getClass('input', ['end'])}`} />
          </div>
          <div className={getClass('input-group')}>
            <label htmlFor='journal-description'
                   className={`u-label ${getClass('label')}`}>
              What were you doing?
            </label>
            <input type='text' id='journal-description' name='description'
                   className={`u-input ${getClass('input', ['description'])}`} />
          </div>
          <input type='submit' name='submit' value='Add Time Entry'
                 className={`u-button ${getClass('submit')}`} />
        </form>
        {this.state.loading ? (
          <p>loading...</p>
        ) : (
          <table className={getClass('entries')}>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {entryComponents}
            </tbody>
          </table>
        )}
        <Navigation />
      </div>
    );
  }

}
