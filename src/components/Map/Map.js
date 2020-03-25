import React, {useEffect, useState} from "react";
import "./MapStyle.scss";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyLocationIcon from '@material-ui/icons/MyLocation';

export default function Map(){

    const defaultLocation = { lat: 35.7673886, lng: 51.3193641 };

    const [map, setMap] = useState(null);
    const [type, setType] = useState('patients');

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
                            reject({ message: 'از طریق \n Settings > Privacy > Location Services > Safari Websites \n دسترسی موقعیت مکانی را فعال کنید.' });
                        },
                    );
                } catch (error) {
                    console.log('Error when calling navigator.geolocation.getCurrentPosition: ', error);
                    reject({ message: 'مرورگر شما قابلیت مکان‌یابی را ندارد' });
                }
            } else {
                reject({ message: 'مرورگر شما قابلیت مکان‌یابی را ندارد' });
            }
        });
    };

    useEffect(() => {
        setMap(new window.L.Map('map', {
        key: 'web.VeNZSu3YdgN4YfaaI0AwLeoCRdi8oZ1jeOj6jm5x',
        maptype: 'dreamy',
        poi: true,
        traffic: false,
        zoomControl: false,
        center: [35.699739, 51.338097],
        zoom: 14}))
        }, []
    );

    useEffect( ()=> {
    });

    useEffect(() => {

        }, [map]
    );

    const handleLocate = async () => {
        const myLatLngLocation = await getCurrentPosition();
        console.log('golnaz myLatLng', myLatLngLocation);
        //TODO flyTo myLatLng
        map.locate({setView: true, maxZoom: 16});
    };

    const openModal = event => {
        console.log('golnaz', event.currentTarget.name)
    };

    return (
        <div className={`contentWrapper MapWrapper`}>
            <div className="map-button-wrapper">
                <button type='button' className='map-button' onClick={() => handleLocate()}><MyLocationIcon /></button>
                <button type="button" name='type' className="map-button type" onClick={e => openModal(e)}>
                    <div>نقشه شیوع کرونا</div>
                    <ExpandMoreIcon />
                </button>
            </div>
            <div id="map" style={{position: 'fixed', top: '48px', right: 0, width: '100vw', height: '100vh', zIndex: 0}}/>
        </div>
    )
}
