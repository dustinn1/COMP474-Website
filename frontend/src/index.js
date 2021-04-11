import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Navigation from './components/navigation';

import Homepage from './pages/homepage';
import Account from './pages/account';

const app = (
  <Router>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/account" component={Account} />
    </Switch>
  </Router>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
