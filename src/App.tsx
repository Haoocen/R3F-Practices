import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from './pages/Home';
import { Example01 } from "./pages/Example01";
import { Example02 } from './pages/Example02';

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/exampleOne">
                  <Example01/>
              </Route>
              <Route exact path="/exampleTwo">
                  <Example02/>
              </Route>
              <Route exact path="/">
                  <Home/>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
