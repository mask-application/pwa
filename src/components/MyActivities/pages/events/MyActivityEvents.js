import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  Divider,
  Modal,
} from '@material-ui/core';
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

import styles from './EventsStyle.module.scss';

import { hideNavigation } from '../../../../redux/actions/CommonActions';

export default function MyActivityEvents() {
  const [showLocationOptionsDialog, setShowLocationOptionsDialog] = useState(
    false
  );
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
        <div
          className="myActivityRow locationInfo"
          onClick={() => {
            setShowLocationOptionsDialog(true);
          }}
        >
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

      <Dialog
        open={showLocationOptionsDialog}
        onClose={() => setShowLocationOptionsDialog(false)}
      >
        <div className={styles.locationDialogContent}>
          <div
            onClick={() => {
              dispatch(hideNavigation());
              history.push('/my-location');
            }}
          >
            نقشه
          </div>
          <Divider light />
          <div>بارکد</div>
        </div>
      </Dialog>
    </>
  );
}
