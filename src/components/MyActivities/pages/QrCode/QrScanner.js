import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './QrCode.scss';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import logo from '../../../../logo-header.png';
import { showNav } from '../../../../redux/actions/CommonActions';
import { KeyboardBackspace } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function QrScanner() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [result, setResult] = useState(['No Result']);

  function handleScan(data) {
    if (data) {
      setResult(data);
    }
  }

  function handleError(err) {
    console.error(err);
  }

  const previewStyle = {
    height: '100%',
    width: '100%',
  };
  const delay = 300;

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
          delay={delay}
          style={previewStyle}
          onError={() => handleError()}
          onScan={(data) => handleScan(data)}
        />
        <div className="qr-result">{result}</div>
      </div>
    </>
  );
}
