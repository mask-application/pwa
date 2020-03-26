import React, {useEffect, useState} from "react";
import "./MapStyle.scss";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Papa from 'papaparse';

export default function Map() {

	const defaultLocation = {
		lat: 35.7673886,
		lng: 51.3193641
	};

	const [map, setMap] = useState(null);
	//TODO initiate from constants
	const [type, setType] = useState('patients');
	const [data, setData] = useState([]);
	//TODO  finding the range, save zoom levels here too
	const [zoomLevels, setZoomLevels] = useState([]);
	const [zoom, setZoom] = useState(0);
	const [showData, setShowData] = useState(null);

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

	//TODO we must read csv file and setData like the structure below
	// data:
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

	const drawPolygon = (color, polygons) => {
		map && polygons && window.L.polygon(polygons, {color: `#${Number(color).toString(16)}`}).addTo(map);
	};

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
						for (let kooft = 0 ; kooft < temp.length ; kooft +=2) {
							points.push([temp[kooft], temp[kooft+1]])
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

	useEffect(() => {console.log('golnaz', showData)}, [showData]);

	const parseFile = (url) => {
		Papa.parse(url, {
			download: true,
			complete: getData
			// rest of config ...
		})
	};

	useEffect(() => {
		setMap(new window.L.Map('map', {
			key        : 'web.VeNZSu3YdgN4YfaaI0AwLeoCRdi8oZ1jeOj6jm5x',
			maptype    : 'dreamy',
			poi        : true,
			traffic    : false,
			zoomControl: false,
			center     : [35.699739, 51.338097],
			zoom       : 14
		}));
		parseFile('https://cdn.covidapp.ir/map/patients.130.csv');
		}, []
	);

	useEffect(()=>{
		map && map.on('zoom', function() {
			const inverseZoomLevel = Math.pow(2, -(map && map.getZoom())) ;
			//FIXME check the condition
            for (let i = zoomLevels.length - 1; i > 0 ; i--) {
            	if ( inverseZoomLevel > zoomLevels[i] ){
            		setZoom(zoomLevels[i]);
					break;
				}
            	else if (inverseZoomLevel <= zoomLevels[i] && inverseZoomLevel > zoomLevels[i-1]) {
            		setZoom(zoomLevels[i-1]);
            		break;
				}
			}
		});
	});

	useEffect(() => {
		data && setShowData(data[zoom]);
	}, [zoom, data]);

	useEffect(() => {
		//draw polygons
		if (showData)
			for (let key in showData[1]) {
				drawPolygon(key, showData[1][key]);
			}
		}, [map, showData]
	);

	const handleLocate = async () => {
		const myLatLngLocation = await getCurrentPosition();
		console.log(myLatLngLocation);
		//TODO flyTo myLatLng
		map.locate({
			setView: true,
			maxZoom: 16
		});
	};

	const openModal = event => {
		//TODO chose type of map
	};

	return (
		<div className={`contentWrapper MapWrapper`}>
			<div className="map-button-wrapper">
				<button type='button' className='map-button' onClick={() => handleLocate()}><MyLocationIcon/></button>
				<button type="button" name='type' className="map-button type" onClick={e => openModal(e)}>
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
