import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import MyActivitiesPage from "./containers/MyActivitiesPage";
import HomePage from "./containers/HomePage";
import MapPage from "./containers/MapPage";
import FamilyActivitiesPage from "./containers/FamilyActivitiesPage";
import InformingPage from "./containers/InformingPage";

// FIXME merge these two files to a sass file please
import "./App.css";
import "./_App.scss";

export default function App() {
  return (
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
              <HomePage />
            </Route>
            <Route path="/map" exact>
              <MapPage />
            </Route>
            <Route path="/my-activities" exact>
              <MyActivitiesPage />
            </Route>
            <Route path="/family-activities" exact>
              <FamilyActivitiesPage />
            </Route>
            <Route path="/informing" exact>
              <InformingPage />
            </Route>
          </Switch>
        </div>
      </div>
      <div className="app-navigation">
        <Navigation />
      </div>
    </div>
  );
}
