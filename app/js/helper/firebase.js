import firebase from 'firebase';

const conn = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_APP_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_APP_ID}.firebaseio.com`,
  storageBucket: `${process.env.FIREBASE_APP_ID}.appspot.com`,
});

export default conn;
