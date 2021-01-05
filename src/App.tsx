import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from './pages/Home';
import {allExamples} from "./pages/examplesUtil";

function App() {
  return (
      <Router>
          <Switch>
              {
                  allExamples.map(({render, path}) => (
                      <Route key={path} exact path={path} render={render}/>
                  ))
              }
              <Route exact path="/">
                  <Home/>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
