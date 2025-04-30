import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import SectionHeader from "../../../components/SectionHeader/SectionHeader.jsx";
import EventsDetailSection from "../../../components/EventsDetailSection/EventsDetailSection.jsx";
import EventsCatalog from "../../../components/EventsCatalog/EventsCatalog.jsx";
import FestImage from "../../../assets/eventsMocks/MCE-square.webp";

export default function EventsPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Мероприятия", path: "/"},
    ]
    const eventsCards = [
        {title: "Музыкальный батл", description: "Музыкальный Батл в 13 Правил – снова в деле! Воскресенье, 30 марта – дата, которую нельзя пропустить! Вас ждёт четвёртый МУЗЫКАЛЬНЫЙ БАТЛ, где талант, азарт и настоящий драйв встретятся в одном месте!", img: "https://center.beer//uploads/bars/1/events/06b7753847d8bb32460e4d03871a6904.jpg", date: "чт. 20 Сентября, 20:00", tags: ["Живая музыка"]},
        {title: "Живая музыка с ONECHE", description: "Ребят, завтра у нас в гостях будет живая музыка с ONECHE — заходи, если чё (ну вы поняли). Всех ждем, всех встречаем!", img: "https://center.beer//uploads/bars/1/events/00561a1ca1e1cdc6710feab3bdc183cd.jpg", date: "чт. 20 Сентября, 20:00", tags: ["Живая музыка", "Свободный вход"]},
        {title: "ЦСКА - Спартак", description: "Не пропустите Московское дерби", img: "https://center.beer//uploads/bars/1/events/cska_match.jpg", date: "чт. 20 Сентября, 20:00", tags: ["Футбол", "Свободный вход"]},
        {title: "Moscow Craft Event 2025", description: "Moscow Craft Event — это крафтовые напитки от лучших пивоварен России, а также гастрономия, авторские товары, конкурсы и, конечно же, музыка", img: FestImage, date: "чт. 1 Мая, 13:00", tags: ["Фестивали"]}
    ]
    const mainCard = {title: "Все мероприятия", date: "21.01.2025", tags: ["Заведения","Пивоварни","Фестивали"]}

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <SectionHeader title="Мероприятия" description={"Погрузитесь в мир пивной культуры вместе с нами! Узнайте о предстоящих фестивалях, дегустациях, мастер-классах и других захватывающих событиях, посвященных пиву. Будь то встреча с мастерами пивоварения, дружеские посиделки или масштабные индустриальные форумы — здесь вы найдете все, что нужно для настоящих ценителей пенного напитка. Присоединяйтесь к сообществу энтузиастов и откройте для себя новые грани пивной культуры!"}></SectionHeader>
            <EventsDetailSection style="regular"><EventsCatalog mainCard={mainCard} eventsCards={eventsCards}/></EventsDetailSection>
        </div>
    )
}