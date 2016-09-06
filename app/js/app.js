import React, {Component} from 'react';
import {render} from 'react-dom';
import bemmit from './util/bemmit';
import firebase from './helper/firebase';

import Auth from './components/Auth';
import Main from './components/Main';

// Styles bundled via webpack, then extracted to a separate file.
const styles = require('../css/main.css');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: false,
      visibleForm: 'sign-up',
    };

    // Whenever the auth state changes, we want to update the app’s state.
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
    });

    // Fat arrow function means we don’t lose `this` in child components.
    this.toggleAuthVisibleForm = (visibleForm, event) => {
      event.preventDefault();

      this.setState({ visibleForm });
    };
  }

  render() {
    if (this.state.user && this.state.user.email) {
      return <Main user={this.state.user} />;
    } else {
      return (
        <Auth
          visibleForm={this.state.visibleForm}
          toggleVisibleForm={this.toggleAuthVisibleForm}
        />
      );
    }
  }

}

render(<App />, document.querySelector('.app-wrapper'));
