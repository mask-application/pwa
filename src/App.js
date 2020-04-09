import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import MyActivitiesPage from './containers/MyActivitiesPage';
import HomePage from './containers/HomePage';
import MapPage from './containers/MapPage';
import FamilyActivitiesPage from './containers/FamilyActivitiesPage';
import MyActivityEventsPage from './containers/MyActivityEventsPage';
import MyHealthEventPage from './containers/MyHealthEventPage';
import InformingPage from './containers/InformingPage';
import QrCodeShow from './components/MyActivities/pages/QrCode/QrCodeShow';
import QrScanner from './components/MyActivities/pages/QrCode/QrScanner';

import './App.scss';
import AddToHomeScreenModal from './components/AddToHomeScreen/AddToHomeScreenModal';

export default function App() {
  const showNavBar = useSelector((state) => state.Commons.showNavigation);
  const user = localStorage.getItem('user');

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (user === null) {
            return <Redirect to="/home" />;
          } else {
            return children;
          }
        }}
      />
    );
  };
  return (
    <div className="app-container">
      <div className="app-content">
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
          <PrivateRoute path="/add-myactivities" exact>
            <MyActivityEventsPage />
          </PrivateRoute>
          <PrivateRoute path="/my-health-event" exact>
            <MyHealthEventPage />
          </PrivateRoute>
          <Route path="/my-qrcode" exact>
            <QrCodeShow />
          </Route>
          <Route path="/qr-scanner" exact>
            <QrScanner />
          </Route>
        </Switch>
      </div>
      {showNavBar && (
        <div className="app-navigation">
          <Navigation />
        </div>
      )}
      <AddToHomeScreenModal />
    </div>
  );
}

// FIXME We should read all the configs from central config file
// console.log(
//   'REACT_APP_SAMPLE_ENVIRONMENT: ',
//   process.env.REACT_APP_SAMPLE_ENVIRONMENT
// );
