import styles from "./CatalogSection.module.css";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import PropTypes from "prop-types";


export default function CatalogSection({specs, CardComponent, IconComponent, cards = {}, wideColumns=false}){
    if (!cards || cards.isLoading || cards.error || !cards?.data || cards?.data?.length === 0) return null

    return(
        <div className={styles.menuSection}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionDescriptionIcon}><IconComponent/></div>
                <div className={styles.sectionDescription}>
                    <h2>{specs?.header}</h2>
                    <p>{specs?.description}</p>
                </div>
                <div className={styles.sectionButton}><IconButton text="Забронировать стол"><IconComponent/></IconButton></div>
            </div>
            <div className={wideColumns ? styles.sectionContentWide : styles.sectionContent}>
                {cards?.data && cards?.data?.length > 0 && cards?.data?.map((cardInfo, index) => <CardComponent key={index} cardInfo={cardInfo}/>)}
            </div>

        </div>
    )
}

CatalogSection.propTypes = {
    specs: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string,
            description: PropTypes.string,
            cards: PropTypes.array,
        })
    ),
    CardComponent: PropTypes.func.isRequired,
    IconComponent: PropTypes.func.isRequired,
    wideColumns: PropTypes.bool
}