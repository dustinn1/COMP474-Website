import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Homepage from './pages/homepage';
import Login from './pages/login';
import AllProjects from './pages/projects/all';
import NewProject from './pages/projects/new'
import Project from './pages/project';
import ProjectEditDetails from './pages/project/edit';
import ProjectEditMembers from './pages/project/members';
import UserSettings from './pages/user_settings';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/session/", {
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setUserId(data.id);
      } else {
        setIsAuthenticated(false);
      }
      setLoaded(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

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
    <>
      <Helmet 
        titleTemplate="Project Manager - %s"
        defaultTitle="Project Manager"
      />
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
              <AllProjects userId={userId} />
            </PrivateRoute>
            <PrivateRoute exact path="/projects/new">
              <NewProject userId={userId} />
            </PrivateRoute>
            <PrivateRoute exact path="/project/:id">
              <Project />
            </PrivateRoute>
            <PrivateRoute exact path="/project/:id/edit/details">
              <ProjectEditDetails />
            </PrivateRoute>
            <PrivateRoute exact path="/project/:id/edit/members">
              <ProjectEditMembers userId={userId} />
            </PrivateRoute>
            <PrivateRoute exact path="/user/settings">
              <UserSettings />
            </PrivateRoute>
          </Switch>
        )}
      </Router>
    </>
  )
}