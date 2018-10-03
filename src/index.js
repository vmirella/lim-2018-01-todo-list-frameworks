import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDtrLufvwFbd_C69ALwHfYrrSKMKaDNHfo",
  authDomain: "to-do-list-22a45.firebaseapp.com",
  databaseURL: "https://to-do-list-22a45.firebaseio.com",
  projectId: "to-do-list-22a45",
  storageBucket: "to-do-list-22a45.appspot.com",
  messagingSenderId: "478219269097"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
