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
	const [data, setData] = useState(null);
	//TODO  finding the range, save zoom levels here too
	const [zoomLevels, setZoomLevels] = useState([0.000240, 0.001700, 0.012000, 0.082000, 0.560000 ]);
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

	const drawPolygon = (polygons) => {
		map && window.L.polygon(polygons.matrix, {color: `#${(polygons.color).toString(16)}`}).addTo(map);
	};

	const getData = result => {
		console.log('golnaz csv', result)
	};

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
		data && setShowData(data.get(zoom));
	}, [zoom, data]);

	useEffect(() => {
		//draw polygons
		if (showData )
			for (let i = 0 ; i < showData.length ; i++) {
				drawPolygon(showData[i]);
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
