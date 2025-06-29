import styles from "./EventsCatalog.module.scss"
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
                    <h2 className="ma-h2">{mainCard.title}</h2>
                    <div className={styles.tagsRow}>
                        {mainCard.tags.map((tag, index) =>
                            <div key={index} className={styles.tag}><p className="text-small">{tag}</p></div>
                        )}
                    </div>
                </div>
            </div>
            <SimpleCatalogSection CardComponent={EventCard} cards={eventsCards}></SimpleCatalogSection>
        </div>
    )
}