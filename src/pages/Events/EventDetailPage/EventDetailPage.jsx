import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import NewsDetailSection from "../../../components/NewsDetailSection/NewsDetailSection.jsx";
import NewsItem from "../../../components/NewsItem/NewsItem.jsx";
import EventsDetailSection from "../../../components/EventsDetailSection/EventsDetailSection.jsx";
import EventsItem from "../EventsItem/EventsItem.jsx";
import {useEffect} from "react";
import EventsMobileSection from "../../../components/EventsMobileSection/EventsMobileSection.jsx";

export default function EventDetailPage(){
    const tags = ["Фестивали"]
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Мероприятия", path: "/events"},
    ]

    useEffect(() => {
        document.title = `center.beer | Мероприятия`
    }, []);

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <EventsMobileSection withInput={false} onChange={() => {}}></EventsMobileSection>
            <EventsDetailSection style="detail">
                <EventsItem tags={tags}/>
            </EventsDetailSection>
        </div>
    )
}