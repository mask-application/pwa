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
import MyActivitiesPage from "./containers/MyActivitiesPage";
import HomePage from "./containers/HomePage";
import MapPage from "./containers/MapPage";
import FamilyActivitiesPage from "./containers/FamilyActivitiesPage";
import InformingPage from "./containers/InformingPage";

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
                                    <HomePage/>
                                </Route>
                                <Route path="/map" exact>
                                    <MapPage/>
                                </Route>
                                <Route path="/me" exact>
                                    <MyActivitiesPage/>
                                </Route>
                                <Route path="/family" exact>
                                    <FamilyActivitiesPage/>
                                </Route>
                                <Route path="/news" exact>
                                    <InformingPage/>
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