import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Homepage from './pages/homepage';
import Login from './pages/login';
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

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? 
          children : 
          <Redirect to={{pathname: "/login", state: { from: location }}}/>
        }
      />
    );
  }

  return (
    <Router> 
      {loaded && (
        <Switch>
          <Route exact path="/">
            { !isAuthenticated ? <Homepage /> : <Redirect to="/projects" /> }
          </Route>
          <Route exact path="/login">
            { !isAuthenticated ? <Login /> : <Redirect to="/" /> }
          </Route>
          <PrivateRoute exact path="/projects">
            <Projects />
          </PrivateRoute>
        </Switch>
      )}
    </Router>
  )
}