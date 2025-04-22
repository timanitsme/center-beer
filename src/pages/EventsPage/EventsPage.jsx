import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import NewsDetailSection from "../../components/NewsDetailSection/NewsDetailSection.jsx";
import NewsCatalog from "../../components/Catalogs/NewsCatalog/NewsCatalog.jsx";
import EventsDetailSection from "../../components/EventsDetailSection/EventsDetailSection.jsx";
import EventsCatalog from "../../components/EventsCatalog/EventsCatalog.jsx";

export default function EventsPage(){
    const paths = [
        {title: "beer.center", path: "/"},
        {title: "Мероприятия", path: "/"},
    ]

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <SectionHeader title="Мероприятия" description={"Погрузитесь в мир пивной культуры вместе с нами! Узнайте о предстоящих фестивалях, дегустациях, мастер-классах и других захватывающих событиях, посвященных пиву. Будь то встреча с мастерами пивоварения, дружеские посиделки или масштабные индустриальные форумы — здесь вы найдете все, что нужно для настоящих ценителей пенного напитка. Присоединяйтесь к сообществу энтузиастов и откройте для себя новые грани пивной культуры!"}></SectionHeader>

            <EventsDetailSection style="regular"><EventsCatalog/></EventsDetailSection>
        </div>
    )
}