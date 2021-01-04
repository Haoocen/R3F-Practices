import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Home from './pages/Home';
import {Example_01} from "./pages/Example_01";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/exampleOne">
                  <Example_01/>
              </Route>
              <Route exact path="/">
                  <Home/>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
