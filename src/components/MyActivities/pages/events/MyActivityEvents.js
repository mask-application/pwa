import React from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import {
  Person,
  LocationOn,
  People,
  KeyboardBackspace,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { PersianLan } from '../../../../constants/Strings';
import '../../MyActivitiesStyle.scss'; //TODO: باید استایل جداسازی بشه

import { showNav } from '../../../../redux/actions/CommonActions';
import logo from '../../../../logo-header.png';

export default function MyActivityEvents(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <AppBar position="static" className="activity-header">
        <Toolbar variant="regular">
          <img src={logo} className="app-header-logo" />
          <IconButton
            color="inherit"
            onClick={() => {
              dispatch(showNav());
              history.push('/my-activities');
            }}
          >
            <KeyboardBackspace />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={`contentWrapper MyActivityEventsWrapper`}>
        <div
          className="myActivityRow healthInfo"
          onClick={() => {
            history.push('/my-health-event');
          }}
        >
          <Person color="primary" style={{ fontSize: 50 }} />
          <div className="content">
            <h3>{PersianLan.myActivitiesTab.interHealthInfo}</h3>
            <p>{PersianLan.myActivitiesTab.interHealthInfoContent}</p>
          </div>
        </div>
        <div className="myActivityRow locationInfo disabled">
          <LocationOn color="primary" style={{ fontSize: 50 }} />
          <div className="content">
            <h3>{PersianLan.myActivitiesTab.interLocation}</h3>
            <p>{PersianLan.myActivitiesTab.interLocationContent}</p>
          </div>
        </div>
        <div className="myActivityRow meetings disabled">
          <People color="primary" style={{ fontSize: 50 }} />
          <div className="content">
            <h3>{PersianLan.myActivitiesTab.interMeetings}</h3>
            <p>{PersianLan.myActivitiesTab.interMeetingsContent}</p>
          </div>
        </div>
      </div>
    </>
  );
}
