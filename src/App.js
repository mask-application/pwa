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
import MyActivityEventsPage from "./containers/MyActivityEventsPage";
import MyHealthEventPage from "./containers/MyHealthEventPage";
import InformingPage from "./containers/InformingPage";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import './App.css';
import './_App.scss';
import {ActionCreator} from "./redux/actions";

function App(props) {
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
                                <Route path="/add-myactivities" exact>
                                    <MyActivityEventsPage/>
                                </Route>
                                <Route path="/my-health-event" exact>
                                    <MyHealthEventPage/>
                                </Route>

                            </Switch>
                        </div>
                    </div>
                    {props.showNavigation &&
                        <div className="app-navigation">
                            <Navigation/>
                        </div>
                    }
                </div>
            </Router>
        </ThemeProvider>
    );
}

const mapStateToProps = state => {
    return {
        showNavigation:state.CommonsReducer.showNavigation
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreator , dispatch);
}

export default connect(mapStateToProps , mapDispatchToProps)(App);