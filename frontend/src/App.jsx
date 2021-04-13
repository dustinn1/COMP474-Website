import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/navigation';

import Homepage from './pages/homepage';
import Login from './pages/account/login';
import Register from './pages/account/register';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getSession();
  });

  let getSession = () => {
    fetch("http://localhost:8000/api/session/", {
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Router> 
      <p>{ isAuthenticated ? 'yes' : 'no' }</p>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/users/login" component={Login} />
        <Route exact path="/users/register" component={Register} />
      </Switch>
    </Router>
  )
}