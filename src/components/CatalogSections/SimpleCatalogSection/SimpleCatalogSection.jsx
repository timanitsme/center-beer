import styles from "../CatalogSection/CatalogSection.module.css";
import PropTypes from "prop-types";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";

export default function SimpleCatalogSection({cards, CardComponent, wideColumns=false, title="", totalItems=null, onShowMore=null}){
    const handleShowMore = () => {
        if (onShowMore){
            onShowMore();
        }
    }

    return(
        <div className={styles.menuSection}>
            <div className={wideColumns ? styles.sectionContentWide : styles.sectionContent}>
                {cards?.map((cardInfo) => {
                    return (<CardComponent key={cardInfo?.id    } cardInfo={cardInfo} title={title}/>)
                })}
            </div>
            {totalItems && cards.length < totalItems && <div className={styles.loadMoreSection}><SimpleButton text="Загрузить еще" style="third" onClick={handleShowMore}></SimpleButton></div>}
        </div>
    )
}

SimpleCatalogSection.propTypes = {
    cards: PropTypes.array,
    CardComponent: PropTypes.func.isRequired,
    wideColumns: PropTypes.bool
}