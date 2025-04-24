import EventMapWithBg from "../../../assets/eventMapMocks/event-map-with-bg-bordered.svg"
import EventMap from "../../../components/EventMap/EventMap.jsx";
import {useEffect, useState} from "react";
import EventMapSidebar from "../../../components/EventMap/EventMapSidebar/EventMapSidebar.jsx";

export default function EventMapPage({setHideFooter}){
    const [isExpanded, setIsExpanded] = useState(false)

    const markers = [
        {id: 1, x: 337, y: 227},
        {id: 2, x: 671, y: 227}
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
            <EventMapSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            <div style={{ width: '100%', height: 'calc(100vh - 95px)', overflow: "hidden" }}>
                {EventMapWithBg && <EventMap svg={EventMapWithBg} markers={markers} setIsExpanded={setIsExpanded}/>}
            </div>
        </div>

    )
}