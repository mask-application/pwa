import React from 'react';
import QrReader from 'react-qr-reader';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNav } from '../../../../redux/actions/CommonActions';
import {
  createQrMeetEvent,
  createQrPlaceEvent,
} from '../../MyActivitiesActions';
import './QrCode.scss';
import logo from '../../../../logo-header.png';

export default function QrScanner() {
  let history = useHistory();
  const dispatch = useDispatch();

  function handleScan(data) {
    if (data) {
      // It is assumed that QR code has always the form person:code
      if (/^person:[a-z0-9]+$/i.test(data)) {
        dispatch(createQrMeetEvent({ id: data.split(':')[1] }, history));
      } else {
        // check if place
        const place = data.split('\n');
        const location = place.find((value) => value.includes('GEO'));
        if (location) {
          const latitude = location.split('GEO')[1].split(',')[0];
          const longitude = location.split('GEO')[1].split(',')[1];
          dispatch(createQrPlaceEvent({ latitude, longitude }, history));
        }
      }
    }
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <>
      <AppBar position="static" className="activity-header">
        <Toolbar>
          <img alt="mask" src={logo} className="app-header-logo" />
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
      <div className="qr-reader-container">
        <QrReader
          className="qr-reader"
          delay={1000}
          onError={() => handleError()}
          onScan={(data) => handleScan(data)}
        />
      </div>
    </>
  );
}
