import styles from "./EventsCatalog.module.css"
import NewsCard1 from "../../assets/newsMocks/news-card-1.svg";
import NewsCard2 from "../../assets/newsMocks/news-card-2.svg";
import NewsCard3 from "../../assets/newsMocks/news-card-3.svg";
import NewsCard4 from "../../assets/newsMocks/news-card-4.svg";
import NewsCard5 from "../../assets/newsMocks/news-card-5.svg";
import NewsCard6 from "../../assets/newsMocks/news-card-6.svg";
import NewsCard7 from "../../assets/newsMocks/news-card-7.svg";
import NewsCard8 from "../../assets/newsMocks/news-card-8.svg";
import NewsCard9 from "../../assets/newsMocks/news-card-9.svg";
import NewsCard10 from "../../assets/newsMocks/news-card-10.svg";
import NewsCard11 from "../../assets/newsMocks/news-card-11.svg";
import NewsCard12 from "../../assets/newsMocks/news-card-12.svg";
import MainNewsCard from "../../assets/eventsMocks/MCE.webp";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import EventCard from "../Cards/EventCard/EventCard.jsx";
import {useNavigate} from "react-router-dom";

export default function EventsCatalog({mainCard, eventsCards}){
    const navigate = useNavigate()

    return(
        <div>
            <div className={styles.mainCard} onClick={() => navigate("/event-map/")}>
                <img src={MainNewsCard} alt=""></img>
                <div className={styles.mainCardDescription}>
                    <h2>{mainCard.title}</h2>
                    <div className={styles.tagsRow}>
                        {mainCard.tags.map((tag, index) =>
                            <div key={index} className={styles.tag}><p>{tag}</p></div>
                        )}
                    </div>
                </div>
            </div>
            <SimpleCatalogSection CardComponent={EventCard} cards={eventsCards}></SimpleCatalogSection>
        </div>
    )
}