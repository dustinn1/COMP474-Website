import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/navigation';

import Homepage from './pages/homepage';
import Projects from './pages/projects';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = () => {
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
      setLoaded(true);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Router> 
      {/* <p>{ isAuthenticated ? 'yes' : 'no' }</p> 
      <Navigation />*/}
      {loaded && (
        <Switch>
          { !isAuthenticated && <Route exact path="/" component={Homepage} />}
          <Route exact path="/" component={Projects} />
        </Switch>
      )}
    </Router>
  )
}