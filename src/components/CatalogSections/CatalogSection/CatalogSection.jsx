import styles from "./CatalogSection.module.scss";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import PropTypes from "prop-types";
import AppliedFilter from "../../AppliedFilter/AppliedFilter.jsx";
import LocationIcon from "../../../assets/location-filled-icon.svg?react";


export default function CatalogSection({specs, CardComponent, IconComponent, cards = {}, wideColumns=false, filterValues= [], filterNameMap={}, removeFilter = () =>{}, countAppliedFilters = ()=>{}, resetFilters = ()=>{}, alias}){
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
            <div className={styles.appliedFiltersRow}>
                {Object.entries(filterValues).map(([filterKey, value]) => {
                    // Пропускаем пустые значения
                    if (!value || (Array.isArray(value) && value.length === 0)) return null;

                    // Если значение — массив, обрабатываем каждый элемент
                    if (Array.isArray(value)) {
                        return value.map((id) => {
                            const filterName = filterNameMap[alias][filterKey]?.[id];
                            if (!filterName) return null;
                            return (
                                <AppliedFilter key={`${filterKey}-${id}`} onClick={() => removeFilter(alias,filterKey, id)}>
                                    <p>{filterName}</p>
                                </AppliedFilter>
                            );
                        });
                    }

                    // Если значение не массив (например, строка или булево значение)
                    if (typeof value === "string") {
                        return (
                            <AppliedFilter key={filterKey} onClick={() => removeFilter(alias, filterKey, value)}>
                                <p>{filterNameMap[alias][filterKey]?.[value] || value.toString()}</p>
                            </AppliedFilter>
                        );
                    }

                    if (typeof value === "boolean"){
                        return (
                            <AppliedFilter key={filterKey} onClick={() => removeFilter(alias, filterKey, value)}>
                                <p>{filterNameMap[alias][filterKey].value}</p>
                            </AppliedFilter>
                        )
                    }

                    return null;
                })}

                {countAppliedFilters(alias) > 0 && <AppliedFilter style="secondary" onClick={() => resetFilters(alias)}>
                    <p>Сбросить фильтры</p>
                </AppliedFilter>}
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