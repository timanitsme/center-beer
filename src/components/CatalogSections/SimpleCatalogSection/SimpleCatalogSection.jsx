import styles from "../CatalogSection/CatalogSection.module.css";
import PropTypes from "prop-types";

export default function SimpleCatalogSection({cards, CardComponent, wideColumns=false, title=""}){
    return(
        <div className={styles.menuSection}>
            <div className={wideColumns ? styles.sectionContentWide : styles.sectionContent}>
                {cards.map((cardInfo) => {
                    return (<CardComponent key={cardInfo.name} cardInfo={cardInfo} title={title}/>)
                })}
            </div>

        </div>
    )
}

SimpleCatalogSection.propTypes = {
    cards: PropTypes.array,
    CardComponent: PropTypes.func.isRequired,
    wideColumns: PropTypes.bool
}