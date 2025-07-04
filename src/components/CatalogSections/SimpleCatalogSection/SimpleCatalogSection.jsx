import styles from "../CatalogSection/CatalogSection.module.scss";
import PropTypes from "prop-types";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import {useEffect, useRef} from "react";

export default function SimpleCatalogSection({cards, CardComponent, SkeletonCardComponent, wideColumns=false, title="", totalItems=null, onShowMore=null, isFetching=false, isLoading=false, lim=6, prefix=""}){
    const handleShowMore = async () => {
        const currentScrollPosition = window.scrollY;

        if (onShowMore) {
            await onShowMore();
        }

        setTimeout(() => {
            window.scrollTo(0, currentScrollPosition);
        }, 0);
    };



    return(
        <div className={styles.menuSection}>
            <div className={wideColumns ? styles.sectionContentWide : styles.sectionContent}>
                {cards?.map((cardInfo) => (
                    <CardComponent key={`${prefix}-${cardInfo?.id}`} cardInfo={cardInfo} title={title} />
                ))}
                {isFetching && SkeletonCardComponent && Array.from({ length: lim }).map((_, index) => (
                    <SkeletonCardComponent key={`skeleton-${index}`} />
                ))}
            </div>
            {totalItems && cards.length < totalItems && <div className={styles.loadMoreSection}><SimpleButton text="Загрузить еще" style="third" onClick={handleShowMore} disabled={isFetching}></SimpleButton></div>}
        </div>
    )
}

SimpleCatalogSection.propTypes = {
    cards: PropTypes.array,
    CardComponent: PropTypes.func.isRequired,
    wideColumns: PropTypes.bool
}