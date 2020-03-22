import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import theme from './theme';
import Navigation from './components/Navigation/Navigation';

import './App.css';

export default function App() {
    // برای یادگیری Router ها در React می‌تونید از پیوند زیر استفاده کنید:
    // https://reacttraining.com/react-router/web/guides/quick-start
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="app-container">
                    <div className="app-content">
                        <div>
                            {/**
                             * A <Switch> looks through its children <Route>s and
                             * renders the first one that matches the current URL.
                             */}
                            <Switch>
                                <Route path="/" exact>
                                    <Redirect to="/home" />
                                </Route>
                                <Route path="/home" exact>
                                    <h2>Home</h2>
                                </Route>
                                <Route path="/map" exact>
                                    <h2>Map</h2>
                                </Route>
                                <Route path="/me" exact>
                                    <h2>Me</h2>
                                </Route>
                                <Route path="/family" exact>
                                    <h2>Family</h2>
                                </Route>
                                <Route path="/news" exact>
                                    <h2>News</h2>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <div className="app-navigation">
                        <Navigation />
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}
