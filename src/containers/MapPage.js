import React from "react";
import Map from "../components/Map/Map";
import Header from "../components/AppHeader/Header";
import Papa from "papaparse"

function MapPage() {
	readSVCFile();

	return (
		<>
			<Header/>
			<Map/>
		</>
	)
}

function readSVCFile() {
	let file = '/mask/src/components/Map/constants/patients.130.csv';
	let txt = '';
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
			txt = xmlhttp.responseText;
		}
	};
	xmlhttp.open("GET", file, true);
	xmlhttp.send();
	let reader = Papa.parse(txt);
	console.log(reader);
	// let reader = new FileReader();
	// console.log(reader)
	// reader.addEventListener('load', function (e) {
	// 	let text = e.target.result;
	// 	let data = [];
	// 	let rows = text.split("\r\n");
	// 	for (let i = 0; i < rows.length; i++) {
	// 		let row_columns = rows[ i ].split(",");
	// 		data.push(row_columns);
	// 	}
	// 	console.log(data);
	// });
	console.log('hello')
}

export default MapPage;
