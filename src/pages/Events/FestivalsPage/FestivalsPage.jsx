import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import SectionHeader from "../../../components/SectionHeader/SectionHeader.jsx";
import EventsDetailSection from "../../../components/EventsDetailSection/EventsDetailSection.jsx";
import EventsCatalog from "../../../components/EventsCatalog/EventsCatalog.jsx";
import FestImage from "../../../assets/eventsMocks/MCE-square.webp"
import {useEffect} from "react";

export default function FestivalsPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Мероприятия", path: "/events"},
        {title: "Фестивали", path: ""},
    ]

    useEffect(() => {
        document.title = `center.beer | Фестивали`
    }, []);

    const eventsCards = [
        {title: "Moscow Craft Event 2025", description: "Moscow Craft Event — это крафтовые напитки от лучших пивоварен России, а также гастрономия, авторские товары, конкурсы и, конечно же, музыка", img: FestImage, date: "чт. 1 Мая, 13:00", tags: ["Фестивали"]},
    ]
    const mainCard = {title: "Фестивали", date: "21.01.2025", tags: ["Фестивали"]}

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <SectionHeader title="Мероприятия" description={"Погрузитесь в мир пивной культуры вместе с нами! Узнайте о предстоящих фестивалях, дегустациях, мастер-классах и других захватывающих событиях, посвященных пиву. Будь то встреча с мастерами пивоварения, дружеские посиделки или масштабные индустриальные форумы — здесь вы найдете все, что нужно для настоящих ценителей пенного напитка. Присоединяйтесь к сообществу энтузиастов и откройте для себя новые грани пивной культуры!"}></SectionHeader>
            <EventsDetailSection style="regular"><EventsCatalog mainCard={mainCard} eventsCards={eventsCards}/></EventsDetailSection>
        </div>
    )
}