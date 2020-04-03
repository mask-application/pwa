import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import './QrCode.scss';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import logo from '../../../../logo-header.png';
import { showNav } from '../../../../redux/actions/CommonActions';
import { KeyboardBackspace } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function QrScanner(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [delay, result, setResult] = useState([100, 'No Result']);

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     delay: 100,
  //     result: 'No result',
  //   };
  //
  //   this.handleScan = this.handleScan.bind(this)
  // }

  function handleScan(data) {
    setResult(data);
  }

  function handleError(err) {
    console.error(err);
  }

  const previewStyle = {
    height: 'auto',
    width: '100%',
  };

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
      <div>
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
        <p>{result}</p>
      </div>
    </>
  );
}
