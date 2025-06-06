import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import NewsDetailSection from "../../../components/NewsDetailSection/NewsDetailSection.jsx";
import NewsItem from "../../../components/NewsItem/NewsItem.jsx";
import EventsDetailSection from "../../../components/EventsDetailSection/EventsDetailSection.jsx";
import EventsItem from "../EventsItem/EventsItem.jsx";
import {useEffect} from "react";

export default function EventDetailPage(){
    const tags = ["Фестивали"]
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Мероприятия", path: ""},
    ]

    useEffect(() => {
        document.title = `center.beer | Мероприятия`
    }, []);

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <EventsDetailSection>
                <EventsItem tags={tags}/>
            </EventsDetailSection>
        </div>
    )
}