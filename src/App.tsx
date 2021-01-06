import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { allExamples, otherExamples } from "./pages/examplesUtil";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                {[...allExamples, ...otherExamples].map(({ render, path }) => (
                    <Route key={path} exact path={path} render={render} />
                ))}

                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
