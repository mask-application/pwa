import React, {useEffect, useState} from "react";
import "./MapStyle.scss";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Papa from 'papaparse';
import * as d3 from "d3";

export default function Map() {

	const defaultLocation = {
		lat: 35.699609,
		lng: 51.338293
	};

	//TODO initiate from constants
	const [type, setType] = useState('patients');
	const [map, setMap] = useState(null);
	const [data, setData] = useState([]);
	const [zoomLevels, setZoomLevels] = useState([]);
	const [zoom, setZoom] = useState(0);
	const [showData, setShowData] = useState(null);
	const [list, setList] = useState([]);

	const getCurrentPosition = () => {
		return new Promise((resolve, reject) => {
			if (!process.env.BROWSER) {
				return resolve(defaultLocation);
			}
			if ('geolocation' in navigator && navigator.geolocation && typeof navigator.geolocation.getCurrentPosition === 'function') {
				try {
					navigator.geolocation.getCurrentPosition(
						position =>
							resolve({
								lat: position.coords.latitude,
								lng: position.coords.longitude,
							}),
						() => {
							reject({message: 'از طریق \n Settings > Privacy > Location Services > Safari Websites \n دسترسی موقعیت مکانی را فعال کنید.'});
						},
					);
				} catch (error) {
					console.log('Error when calling navigator.geolocation.getCurrentPosition: ', error);
					reject({message: 'مرورگر شما قابلیت مکان‌یابی را ندارد'});
				}
			}
			else {
				reject({message: 'مرورگر شما قابلیت مکان‌یابی را ندارد'});
			}
		});
	};

	const drawPolygon = (color, polygons) => {
		map && polygons && window.L.polygon(polygons,
			{
				fillColor: `#${Number(color).toString(16)}`,
				fill: true,
				stroke: false,
				fillOpacity: 0.35,
			}).addTo(map);
	};

  const clearPolygon = () => {
    if(map) {
      d3.selectAll(".leaflet-interactive").remove();
    }
  };

	// data format:
	// [
	// 		[
	// 			<zoomLevel number as key>
	// 			0.0024,
	// 			<polygons array as value>
	// 			[
	// 				{
	// 					color1: ...
	// 					matrix: [[[]]]
	// 				},
	// 				{
	// 					color2: ...
	// 					matrix: [[[]]]
	// 				},
	// 				...
	// 			]
	// 		],
	// 		[
	// 			...
	// 		]
	// ]

	const getData = result => {
		const line = result.data;
		const lineNumber = line.length;
		for (let i = 0 ; i < lineNumber ;) {
			if (line[i].length === 1){
				setZoomLevels(prevLevels =>[...prevLevels, result.data[i][0]]);
				let j = i+1;
				let polygons = [];
				while (j < lineNumber && line[j].length > 1){
					polygons.push(line[j]);
					j++;
				}
				let sameColor = {};
				for (let k = 0; k < polygons.length;) {
					let color = polygons[0][0];
					if(polygons[k][0] === color){
						let points = [];
						let temp = polygons[k].slice(1);
						for (let k = 0 ; k < temp.length ; k +=2) {
							points.push([temp[k], temp[k+1]])
						}
						if (color in sameColor)
							sameColor[color].push([points]);
						else sameColor[color] = [points];
						polygons.splice(k, 1);
						k = 0;
					} else { k++; }
				}
				setData(prevData => [...prevData, [Number(line[i][0]), sameColor]]);
				i = j;
			}
		}
	};

	const parseFile = (url) => {
		Papa.parse(url, {
			download: true,
			complete: getData
		})
	};

	function getMoviesFromApiAsync() {
		return fetch('https://cdn.covidapp.ir/map/maps.json')
			.then((response) => response.json())
			.then((responseJson) => {
				setList(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect(() => {
		let version;
		if(list) {
			const options = Object.values(list)[0] || [];
			for (let i = 0 ; i < options.length ; i++) {
				if (((options)[i] || {}).id === 'patients') {
					version = options[i].version;
				}
			}
		}
		version && parseFile(`https://cdn.covidapp.ir/map/patients.${version}.csv`);
	}, [list]);

	useEffect(() => {
		getMoviesFromApiAsync().then();
		setMap(new window.L.Map('map', {
			//FIXME CRITICAL set token
			key        : 'web.VeNZSu3YdgN4YfaaI0AwLeoCRdi8oZ1jeOj6jm5x',
			maptype    : 'dreamy',
			poi        : true,
			traffic    : false,
			zoomControl: false,
			center     : [35.699739, 51.338097],
			zoom       : 14
		}));
		}, []
	);

	useEffect(()=>{
		map && map.on('zoom', function() {
			const inverseZoomLevel = 10*Math.pow(2, -(map && map.getZoom())) ;
			//FIXME check the condition
            for (let i = 0; i < zoomLevels.length - 1 ; i++) {
            	if ( inverseZoomLevel < zoomLevels[i] ){
            		setZoom(i);
					break;
				}
            	else if (inverseZoomLevel >= zoomLevels[i] && inverseZoomLevel < zoomLevels[i+1]) {
            		setZoom(i+1);
            		break;
				}
			}
		});
	});

	useEffect(() => {
		data && setShowData(data[zoom]);
	}, [zoom, data]);

	useEffect(() => {
		clearPolygon();
		if (showData)
			for (let key in showData[1]) {
				drawPolygon(key, showData[1][key]);
			}
		}, [map, showData]
	);

	const handleLocate = async () => {
		const myLatLngLocation = await getCurrentPosition();
		map.flyTo(myLatLngLocation, 15);
	};

	const openModal = event => {
		//TODO chose 'type' of map
	};

	return (
		<div className={`contentWrapper MapWrapper`}>
			<div className="map-button-wrapper">
				<button type='button' className='map-button location' onClick={() => handleLocate()}><MyLocationIcon/></button>
				<button type="button" disabled={true} name='type' className="map-button type" onClick={e => openModal(e)}>
					{/*TODO read from state*/}
					<div>نقشه شیوع کرونا</div>
					<ExpandMoreIcon/>
				</button>
			</div>
			<div id="map" style={{
				position: 'fixed',
				top     : '48px',
				right   : 0,
				width   : '100vw',
				height  : '100vh',
				zIndex  : 0
			}}/>
		</div>
	)
}
