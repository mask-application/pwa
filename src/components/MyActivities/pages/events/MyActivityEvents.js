import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Person, LocationOn, People, ArrowForward } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import {} from '@material-ui/icons';
import { PersianLan } from '../../../../constants/Strings';
import '../../MyActivitiesStyle.scss'; //TODO: باید استایل جداسازی بشه

import { showNav } from '../../../../redux/actions/CommonActions';

export default function MyActivityEvents(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton
            color="inherit"
            onClick={() => {
              dispatch(showNav());
              history.push('/my-activities');
            }}
          >
            <ArrowForward />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {PersianLan.app_header}
          </Typography>
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
