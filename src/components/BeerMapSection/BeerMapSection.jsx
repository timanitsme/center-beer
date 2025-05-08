import SectionHeader from "../SectionHeader/SectionHeader.jsx";
import styles from "./BeerMapSection.module.css"
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import HopIcon from "../../assets/hop-icon.svg?react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import L from "leaflet";
import MapMarker from "../../assets/map-marker.svg";
import {useGetBarsQuery} from "../../store/services/centerBeer.js";

export default function BeerMapSection(){
    const markers = [
        {position: [55.731945, 37.617379], title: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {position: [55.755820, 37.617633], title: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {position: [55.743954, 37.684563], title: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {position: [55.794747, 37.532642], title: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {position: [59.915611, 30.336299], title: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {position: [59.894900, 30.289223], title: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
        {position: [59.939466, 30.426361], title: "13 rules",  address: "ул. Такая-то д.19", phone: "+7 (916) 298-06-14"},
    ]


    const {data: barsData, isLoading: barsIsLoading, error: barsError } = useGetBarsQuery({lim: 200, offset: 0});

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
    if (!barsData) return null
    return(
        <>
            <SectionHeader title="Карта баров" description="Собрали для вас список лучших пивных баров, где можно насладиться свежесваренным пивом, закусками и уютной атмосферой. От классических пабов до оригинальных крафтовых баров — каждый найдет место по вкусу."/>
            <div className={styles.mapContainer}>
                <MapContainer center={[55.755820, 37.617633]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {barsData.data?.length !== 0 && barsData.data?.map((marker, index) =>
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
        </>
    )
}