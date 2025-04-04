import styles from "./BeerMap.module.css"
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useEffect, useState} from "react";
import L from "leaflet"
import MapMarker from "../../assets/map-marker.svg"
import HopIcon from "../../assets/hop-icon.svg?react"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import {useNavigate} from "react-router-dom";
import {useGetBarsQuery} from "../../store/services/centerBeer.js";


export default function BeerMap({data = []}){

    const markers = [
        {lon: 55.731945, lat: 37.617379, name: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {lon: 55.755820, lat: 37.617633, name: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {lon: 55.743954, lat: 37.684563, name: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {lon: 55.794747, lat: 37.532642, name: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {lon: 59.915611, lat: 30.336299, name: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {lon: 59.894900, lat: 30.289223, name: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {lon: 59.939466, lat: 30.426361, name: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
    ]

    const navigate = useNavigate()
    useEffect(() => {
        // Перерисовка карты после монтирования компонента
        window.dispatchEvent(new Event('resize'));
    }, []);

    const myIcon = new L.Icon({
        iconUrl: MapMarker,
        iconRetinaUrl: MapMarker,
        popupAnchor:  [-0, -0],
        iconSize: [35,35],
    });
    const goToBarPage = (alias) => navigate(`/bar/${alias}`);

    if (!data) return null
    return(
        <div className={styles.mapContainer}>
            <MapContainer center={[55.755820, 37.617633]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data?.length !== 0 && data?.map((marker, index) =>
                    <Marker key={index} position={[marker?.lon, marker?.lat]} icon={myIcon}>
                        <Popup>
                            <div className={styles.markerPopUp}>
                                <h3>{marker?.name}</h3>
                                <p><span className={styles.active}>Адрес:</span> {marker?.address}</p>
                                <p><span className={styles.active}>Телефон:</span> {marker?.contacts}</p>
                                <IconButton text={"Подробнее"} onClick={() => goToBarPage(marker?.alias)}><HopIcon/></IconButton>
                            </div>
                        </Popup>
                    </Marker>)}
            </MapContainer>
        </div>
    )
}