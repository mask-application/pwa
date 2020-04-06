import React, { useEffect, useState } from 'react';
import './MapStyle.scss';
import * as utility from './utility';
import Papa from 'papaparse';
import * as d3 from 'd3';
import logo from '../../logo1.png';
import { Menu, MenuItem, IconButton, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import CloseIcon from '@material-ui/icons/Close';

export default function Map() {
  // FIXME you are using leaflet but you haven't imported it in this component because you have put it in index.html
  // try to use react leaflet and help encapsulation components (and Separation of concerns)

  const [chosenMap, setChosenMap] = useState(null);
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const [zoomLevels, setZoomLevels] = useState([]);
  const [zoom, setZoom] = useState(0);
  const [showData, setShowData] = useState(null);
  const [list, setList] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMapFetching, setIsMapFetching] = useState(false);
  const [vpnAlert, setVpnAlert] = useState(true);
  const [serverError, setServerError] = useState(false);

  // #TODO polygons -> points ot latLongs
  const drawPolygon = (color, polygons) => {
    map &&
      polygons &&
      window.L.polygon(polygons, {
        fillColor: `#${Number(color).toString(16)}`,
        fill: true,
        stroke: false,
        fillOpacity: 0.4,
      }).addTo(map);
  };

  const clearPolygon = () => {
    if (map) {
      d3.selectAll('.leaflet-interactive').remove();
    }
  };

  //  TODO explain about the code (Explain the goal for each section to help other developers).
  //   Maybe a separate file would be better to include such these functions
  const getData = (result) => {
    setIsMapFetching(false);
    setZoomLevels([]);
    const line = result.data;
    const lineNumber = line.length;
    for (let i = 0; i < lineNumber; ) {
      if (line[i].length === 1) {
        setZoomLevels((prevLevels) => [...prevLevels, result.data[i][0]]);
        let j = i + 1;
        let polygons = [];
        while (j < lineNumber && line[j].length > 1) {
          if (!isNaN(line[j][0])) polygons.push(line[j]);
          j++;
        }
        let sameColor = {};
        for (let k = 0; k < polygons.length; ) {
          let color = polygons[0][0];
          if (polygons[k][0] === color) {
            let points = [];
            let temp = polygons[k].slice(1);
            for (let k = 0; k < temp.length; k += 2) {
              points.push([temp[k], temp[k + 1]]);
            }
            if (color in sameColor) sameColor[color].push([points]);
            else sameColor[color] = [points];
            polygons.splice(k, 1);
            k = 0;
          } else {
            k++;
          }
        }
        setData((prevData) => [...prevData, [Number(line[i][0]), sameColor]]);
        i = j;
      }
    }
  };

  const parseFile = (url) => {
    setData([]);
    setIsMapFetching(true);
    Papa.parse(url, {
      download: true,
      complete: getData,
    });
  };

  function getMapTypeLists() {
    setIsMapFetching(true);
    return fetch(`${process.env.REACT_APP_GET_MAP_TYPE_LISTS}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setList(Object.values(responseJson)[0]);
      })
      .catch((error) => {
        setServerError(true);
        console.error(error);
      });
  }

  useEffect(() => {
    getMapTypeLists().then();
    // FIXME configs should be moved in the config file
    setMap(
      new window.L.Map('map', {
        // FIXME CRITICAL set token
        key: process.env.REACT_APP_MAP_TOKEN,
        // key: 'web.VeNZSu3YdgN4YfaaI0AwLeoCRdi8oZ1jeOj6jm5x',
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
    list && setChosenMap(list[0]);
  }, [list]);

  useEffect(() => {
    let version;
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if ((list[i] || {}).id === chosenMap.id) {
          version = list[i].version;
        }
      }
    }
    version &&
      parseFile(
        `${process.env.REACT_APP_MAP_CDN}${chosenMap.id}.${version}.csv`
      );
  }, [chosenMap]);

  useEffect(() => {
    setShowData(((data || {})[zoom] || [])[1]);
  }, [zoom, data]);

  useEffect(() => {
    clearPolygon();
    if (showData)
      for (let key in showData) {
        drawPolygon(key, showData[key]);
      }
  }, [map, showData]);

  const handleLocate = async () => {
    const myLatLngLocation = await utility.getCurrentPosition();
    map.flyTo(myLatLngLocation, 15);
  };

  useEffect(() => {
    setZoom(zoomLevels.length - 1);
  }, [zoomLevels]);

  useEffect(() => {
    map &&
      map.on('zoom', function () {
        const inverseZoomLevel = 10 * Math.pow(2, -(map && map.getZoom()));
        //TODO check the condition
        for (let i = 0; i < zoomLevels.length - 1; i++) {
          if (inverseZoomLevel < zoomLevels[i]) {
            setZoom(i);
            break;
          } else if (
            inverseZoomLevel >= zoomLevels[i] &&
            inverseZoomLevel < zoomLevels[i + 1]
          ) {
            setZoom(i + 1);
            break;
          }
        }
      });
  });

  const clickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (value) => {
    value && setChosenMap(value);
    setAnchorEl(null);
  };

  const menu = (
    <Menu
      classes={{
        paper: 'map-menu',
      }}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => closeMenu()}
    >
      {list &&
        list.map((item) => {
          return (
            <MenuItem
              key={item.id}
              classes={{ root: 'map-menu-item' }}
              onClick={() => closeMenu(item)}
              disabled={item.id === 'testlabs' || item.id === 'hospitals'}
            >
              {item.name}
            </MenuItem>
          );
        })}
    </Menu>
  );

  return (
    <div className={`contentWrapper MapWrapper`}>
      <div className="alerts">
        <Collapse className="map-alert-wrapper" in={isMapFetching}>
          <Alert
            severity="info"
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  setIsMapFetching(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            تا دریافت اطلاعات منتظر بمانید.
          </Alert>
        </Collapse>
        {serverError && (
          <Collapse className="map-alert-wrapper" in={vpnAlert}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setVpnAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              در صورت اتصال، vpn دستگاه را قطع کنید.
            </Alert>
          </Collapse>
        )}
      </div>
      <div className="map-button-wrapper">
        <button
          type="button"
          className="map-button"
          onClick={() => handleLocate()}
        >
          <MyLocationIcon />
        </button>
        <button
          type="button"
          name="chosenMap"
          className="map-button type"
          onClick={(e) => clickMenu(e)}
        >
          <div>{(chosenMap || {}).name}</div>
          <ExpandMoreIcon />
        </button>
      </div>
      {/* TODO config file */}
      <div
        id="map"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      />
      <div className="comment-wrapper">
        <div className="map-comment">{(chosenMap || {}).comment}</div>
      </div>
      <div className="logo-wrapper">
        <img src={logo} alt="" />
      </div>
      {menu}
    </div>
  );
}
