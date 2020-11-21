import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import './MapStyle.scss';
import * as utility from './utility';
import Papa from 'papaparse';
import * as d3 from 'd3';
import logo from '../../logo.png';
import neshanLogo from '../../Logo_copyright-min.png';
import {db} from '../../services/db';
import {fetchMaps, fetchPrivateMaps} from './MapActions';
import {decryptPrivateMap} from '../../utils/crypto';

import {Menu, MenuItem, IconButton, Collapse} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import CloseIcon from '@material-ui/icons/Close';

function Map() {
    // FIXME you are using leaflet but you haven't imported it in this component because you have put it in index.html
    // try to use react leaflet and help encapsulation components (and Separation of concerns)

    const [chosenMap, setChosenMap] = useState(null);
    const [map, setMap] = useState(null);
    const [data, setData] = useState([]);
    const [label, setLabel] = useState([]);
    const [zoom, setZoom] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDataFetching, setIsDataFetching] = useState(false);
    const [isDataProcessing, setisDataProcessing] = useState(false);
    const [vpnAlert, setVpnAlert] = useState(true);

    const {user, token} = useSelector((state) => state.MyActivities);

    const {
        isMapFetching,
        isPrivateMapFetching,
        mapList,
        serverError,
    } = useSelector((state) => state.Map);
    const dispatch = useDispatch();

    const drawPolygon = useCallback(
        (color, polygons) => {
            if (map && polygons) {
                for (let polygon of polygons) {
                    let tooltip = null;
                    let width = null;
                    if (isNaN(polygon[polygon.length - 1][0])) {
                        tooltip = polygon[polygon.length - 1][0];
                        width = polygon[polygon.length - 1][1];
                        polygon = polygon.slice(0, polygon.length - 1);
                    }
                    window.L.polygon([polygon], {
                        fillColor: `#${(Number(color) % 0x1000000).toString(16)}`,
                        fill: true,
                        stroke: false,
                        fillOpacity: Number(color) / 0x1000000 / 255.0,
                    }).on('click', function (e) {
                        showTooltip(tooltip, width, e)
                    }).addTo(map);
                }
            }
        },
        [map]
    );

    var popup = map && window.L.popup();

    function showTooltip(tooltip, width, e) {
        if (tooltip !== null) {
            let url = `${process.env.REACT_APP_MAP_IMAGE_CDN}${tooltip}`;
            popup
                .setLatLng(e.latlng)
                .setContent("<div>" +
                    "<img style=\"max-width: 1000px; width: " + width + "px;\" alt=\"stats\" src=" + url + " /> </div>")
                .openOn(map);
        }
    }


    const clearPolygon = useCallback(() => {
        if (map) {
            d3.selectAll('.leaflet-interactive').remove();
        }
    }, [map]);

    const clearLabel = useCallback(() => {
        if (map) {
            d3.selectAll('.leaflet-tooltip').remove();
        }
    }, [map]);

    const getData = (url, result, cached = false) => {
        setIsDataFetching(false);

        if (!result) return undefined;

        // Add to cache if map does not exist
        !cached &&
        db.set({
            data: result,
            fileName: url,
            mapName: chosenMap.id,
        });

        setisDataProcessing(true);
        const line = result;
        const lineNumber = line.length;
        let zzoom = null;
        let polygons = [];
        let sPolygons = [];
        let labels = [];
        for (let i = 0; i <= lineNumber; i++) {
            if (i === lineNumber || line[i].length === 1) {
                if (i > 0) {
                    let sameColor = {};
                    polygons.push(...sPolygons);
                    for (let j = 0; j < polygons.length; j++) {
                        let color = polygons[j][0];
                        let points = [];
                        for (let k = 1; k < polygons[j].length; k += 2)
                            points.push([polygons[j][k], polygons[j][k + 1]]);
                        if (color in sameColor)
                            sameColor[color].push(points);
                        else
                            sameColor[color] = [points];
                    }
                    setData((prevData) => [...prevData, [zzoom, sameColor]]);
                    setLabel((prevLabel) => [...prevLabel, [zzoom, labels]]);
                    polygons = [];
                    sPolygons = [];
                    labels = [];
                }
                if (i < lineNumber)
                    zzoom = Number(line[i][0]);
                continue;
            }
            if (line[i][0] === 'P') {
                polygons.push(line[i].slice(1));
            }
            if (line[i][0] === 'S') {
                sPolygons.push(line[i].slice(1));
            }
            if (line[i][0] === 'L') {
                labels.push({
                    text: line[i][1],
                    point: [line[i][2], line[i][3]],
                    size: line[i][4],
                    color: `#${(Number(line[i][5]) % 0x1000000).toString(16)}`,
                    opacity: Number(line[i][5]) / 0x1000000 / 255.0,
                })
            }
        }
        setisDataProcessing(false);
        setData((prevData) => [...prevData]);
        setLabel((prevData) => [...prevData]);
    };

    const parseFile = async (url, key) => {
        setData([]);
        setLabel([]);
        setIsDataFetching(true);
        const _cached = await db.get(url);
        if (_cached.length) {
            getData(url, _cached[0].data, true);
        } else {
            if (key) {
                const response = await axios({
                    url,
                    method: 'GET',
                    responseType: 'blob',
                });
                const decrypted = decryptPrivateMap(response.data, key);
                decrypted &&
                Papa.parse(decrypted, {
                    complete: (result) => getData(url, result.data, false),
                });
            } else {
                Papa.parse(url, {
                    download: true,
                    complete: (result) => getData(url, result.data, false),
                });
            }
        }
    };

    const findZoomLevels = useCallback(() => {
        const result = [];
        data.map((element) => result.push(element[0]));
        return result;
    }, [data]);

    const findZoom = useCallback(() => {
        const inverseZoomLevel = 10 * Math.pow(2, -(map && map.getZoom()));
        const zoomLevels = data && findZoomLevels();
        for (let i = 0; i < zoomLevels.length - 1; i++) {
            if (inverseZoomLevel <= zoomLevels[i]) {
                setZoom(i);
                break;
            } else if (
                inverseZoomLevel > zoomLevels[i] &&
                inverseZoomLevel <= zoomLevels[i + 1]
            ) {
                setZoom(i + 1);
                break;
            } else {
                setZoom(zoomLevels.length - 1)
            }
        }
    }, [map, data, findZoomLevels]);

    useEffect(() => {
        findZoom();
    }, [findZoom, data]);

    useEffect(() => {
        map &&
        map.on('zoom', function () {
            findZoom();
        });
    });

    const hasPrivateAccess = () => {
        return (
            user &&
            user.permissions.filter((perm) => perm === 'webmap').length &&
            user.permissions.some((perm) => {
                return perm.includes('maps_');
            })
        );
    };

    useEffect(() => {
        dispatch(fetchMaps());
        hasPrivateAccess() && dispatch(fetchPrivateMaps(token));
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
    }, [dispatch]);

    useEffect(() => {
        mapList && setChosenMap(mapList[0]);
    }, [mapList]);

    useEffect(() => {
        chosenMap &&
        parseFile(
            `${process.env.REACT_APP_MAP_CDN}${chosenMap.id}.${chosenMap.version}.csv`,
            chosenMap.key
        );
    }, [chosenMap]);

    useEffect(() => {
        if (isDataProcessing)
            return;
        clearPolygon();
        if (!((data || {})[zoom] || [])[1]) {
            return;
        }
        console.log("drawpolygon")
        for (let key in data[zoom][1]) {
            if (Object.prototype.hasOwnProperty.call(data[zoom][1], key))
                drawPolygon(key, data[zoom][1][key]);
        }
    }, [map, zoom, data, clearPolygon, drawPolygon]);

    useEffect(() => {
        if (isDataProcessing)
            return;
        clearLabel();
        if (!((label || {})[zoom] || [])[1]) {
            return;
        }
        // TODO clean this shit
        let root = document.documentElement;
        root.style.setProperty('--label-color', '#000000');
        root.style.setProperty('--label-size', 10);
        for (let entry of label[zoom][1]) {
            window.L.marker(entry.point, {
                opacity: 0,
            }).bindTooltip(entry.text, {
                permanent: true,
                className: 'map-label',
                direction: 'top',
            }).addTo(map);
        }
    }, [map, label, zoom, clearLabel]);

    const handleLocate = async () => {
        const myLatLngLocation = await utility.getCurrentPosition();
        map.flyTo(myLatLngLocation, 15);
    };

    const clickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (value) => {
        value && setChosenMap(value);
        setAnchorEl(null);
    };

    const renderMenu = () => {
        return (
            <Menu
                classes={{
                    paper: 'map-menu',
                }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => closeMenu()}
            >
                {mapList &&
                mapList.map((item) => {
                    return (
                        <MenuItem
                            key={item.id}
                            classes={{root: 'map-menu-item'}}
                            onClick={() => closeMenu(item)}
                        >
                            {item.name}
                        </MenuItem>
                    );
                })}
            </Menu>
        );
    };

    return (
        <div className={`contentWrapper MapWrapper`}>
            <div className="alerts">
                <Collapse
                    className="map-alert-wrapper"
                    in={isDataFetching || isMapFetching || isPrivateMapFetching}
                    addEndListener={null}
                >
                    <Alert
                        severity="info"
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setIsDataFetching(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    >
                        تا دریافت اطلاعات منتظر بمانید.
                    </Alert>
                </Collapse>
                {serverError && (
                    <Collapse
                        className="map-alert-wrapper"
                        in={vpnAlert}
                        addEndListener={null}
                    >
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
                                    <CloseIcon fontSize="inherit"/>
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
                    <MyLocationIcon/>
                </button>
                <button
                    type="button"
                    name="chosenMap"
                    className="map-button type"
                    onClick={(e) => clickMenu(e)}
                >
                    <div>{(chosenMap || {}).name}</div>
                    <ExpandMoreIcon/>
                </button>
            </div>
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
                <div className="map-comment">{(chosenMap || {}).comment || 'ــ'}</div>
            </div>
            <div className="logo-wrapper right">
                <img src={logo} alt=""/>
            </div>
            <div className="logo-wrapper left">
                <img src={neshanLogo} alt=""/>
            </div>
            {renderMenu()}
        </div>
    );
}

export default Map;
