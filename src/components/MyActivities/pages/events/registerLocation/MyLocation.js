import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Dialog } from '@material-ui/core';
import {
  Person,
  LocationOn,
  People,
  KeyboardBackspace,
} from '@material-ui/icons';
import { PersonPinCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import logo from '../../../../../logo-header.png';
import './LocationMapStyle.scss';

export default function MyLocation() {
  let history = useHistory();
  const [map, setMap] = useState(null);
  const [isMapFetching, setIsMapFetching] = useState(false);
  const [list, setList] = useState(null);
  const [zoomLevels, setZoomLevels] = useState([]);
  const [zoom, setZoom] = useState(0);

  function getMapTypeLists() {
    setIsMapFetching(true);
    return fetch(`${process.env.REACT_APP_GET_MAP_TYPE_LISTS}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setList(Object.values(responseJson)[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getMapTypeLists().then();
    setMap(
      new window.L.Map('map', {
        key: process.env.REACT_APP_MAP_TOKEN,
        maptype: 'dreamy',
        poi: true,
        traffic: false,
        zoomControl: false,
        center: [32.4279, 53.688],
        zoom: 4.2,
      })
    );
  }, []);

  useEffect(() => {
    map &&
      map.on('zoom', function (event) {
        console.log(map.getCenter());
      });
    map && console.log('@@@ ', map.getCenter());
  });

  return (
    <>
      <AppBar position="static" className="activity-header">
        <Toolbar variant="regular">
          <img src={logo} className="app-header-logo" />
          <IconButton
            color="inherit"
            onClick={() => {
              history.push('/add-myactivities');
            }}
          >
            <KeyboardBackspace />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={'location-map-container'}>
        <div className={'myLocationIcon'}>
          <PersonPinCircle
            color="primary"
            style={{ fontSize: 65, color: 'rgba(0,0,0,0.7)' }}
          />
        </div>
        <div
          id="map"
          style={{
            position: 'fixed',
            top: 56,
            right: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
          }}
        />
      </div>
    </>
  );
}
