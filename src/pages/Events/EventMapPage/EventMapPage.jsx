import EventMapWithBg from "../../../assets/eventMapMocks/event-map-with-bg-bordered.svg?react"
import EventMap from "../../../components/EventMap/EventMap.jsx";
import {useEffect, useState} from "react";
import EventMapSidebar from "../../../components/EventMap/EventMapSidebar/EventMapSidebar.jsx";
import festMapString from "../../../assets/eventMapMocks/festMapString.js";
import {useGetFestQuery} from "../../../store/services/centerBeer.js";
import FestSchedule from "../../../assets/eventsMocks/fest-schedule.jpg";
import SingleImageModal from "../../../components/Modals/SingleImageModal/SingleImageModal.jsx";

export default function EventMapPage({setHideFooter}){
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [lightMarker, setLightMarker] = useState(null)
    const {data, isLoading, error} = useGetFestQuery(1)
    const [showModal, setShowModal] = useState(false)
    const markers = [
        {id: 1, x: 76.64, y: 268.995, width: 25, height: 25},
        {id: 2, x: 76.64, y: 314.635, width: 25, height: 25},
        {id: 3, x: 76.64, y: 363.015, width: 25, height: 25},
        {id: 4, x: 76.64, y: 411.205, width: 25, height: 25},
        {id: 5, x: 76.64, y: 459.595, width: 25, height: 25},
        {id: 6, x: 76.64, y: 511.015, width: 25, height: 25},
        {id: 7, x: 340.395, y: 829.855, width: 25, height: 25},
        {id: 8, x: 391.815, y: 829.855, width: 25, height: 25},
        {id: 9, x: 440.205, y: 829.855, width: 25, height: 25},
        {id: 10, x: 488.405, y: 829.855, width: 25, height: 25},
        {id: 11, x: 536.775, y: 829.855, width: 25, height: 25},
        {id: 12, x: 582.415, y: 829.855, width: 25, height: 25},
        {id: 13, x: 629.795, y: 829.855, width: 25, height: 25},
        {id: 14, x: 686.2, y: 515.22, width: 21, height: 21},
        {id: 15, x: 686.2, y: 491.97, width: 21, height: 21},
        {id: 16, x: 686.2, y: 468.72, width: 21, height: 21},
        {id: 17, x: 686.2, y: 445.46, width: 21, height: 21},
        {id: 18, x: 686.2, y: 422.2, width: 21, height: 21},
        {id: 19, x: 686.2, y: 398.95, width: 21, height: 21},
        {id: 20, x: 686.2, y: 375.69, width: 21, height: 21},
        {id: 21, x: 494.39, y: 626.645, width: 45, height: 45},
        {id: 22, x: 431.96, y: 677.395, width: 45, height: 45},
        {id: 23, x: 484.56, y: 677.395, width: 45, height: 45},
        {id: 24.1, x: 535.755, y: 676.255, width: 41, height: 41},
        {id: 24.2, x: 576.065, y: 676.255, width: 41, height: 41},
        {id: 25, x: 625.505, y: 676.985, width: 41, height: 41},
        {id: 26, x: 546.98, y: 626.645, width: 45, height: 45},
        {id: 27, x: 251.24, y: 449.81, width: 41, height: 41},
        {id: 28, x: 300.59, y: 449.81, width: 41, height: 41},
        {id: 29, x: 349.56, y: 449.81, width: 41, height: 41},
        {id: 30, x: 364.81, y: 402.71, width: 41, height: 41},
        {id: 31, x: 240.99, y: 402.71, width: 41, height: 41},
        {id: 32, x: 240.99, y: 360.75, width: 41, height: 41},
        {id: 33, x: 306.99, y: 360.75, width: 41, height: 41},
        {id: 34, x: 240.99, y: 318.53, width: 41, height: 41},
        {id: 35, x: 260.4, y: 234.62, width: 41, height: 41},
    ]
    useEffect(() => {
        if (setHideFooter){
            setHideFooter(true)
        }

        return () => {
            if (setHideFooter) {
                setHideFooter(false);
            }
        };
    }, [setHideFooter]);

    return(
        <div className="content" style={{minHeight: "600px", display: "flex"}}>
            {data && !isLoading && !error &&
              <>
                  <EventMapSidebar selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} breweries={data.data.breweries} setLightMarker={setLightMarker}/>
                  <div className={"map-content"} style={{ width: '100%', height: 'calc(100vh - 95px)', overflow: "hidden", touchAction: "pinch-zoom" }}>
                      {EventMapWithBg && <EventMap svg={festMapString()} markers={markers} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} breweries={data.data.breweries} setShowModal={setShowModal}
                      lightMarker={lightMarker} setLightMarker={setLightMarker}/>}
                  </div>
              </>
            }
            <SingleImageModal show={showModal} setShow={setShowModal} src={FestSchedule}></SingleImageModal>
        </div>

    )
}