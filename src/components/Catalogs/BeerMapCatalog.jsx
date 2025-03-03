import {useState} from "react";
import styles from "./BarsCatalog.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import FilterComboBox from "../Inputs/FilterComboBox/FilterComboBox.jsx";
import Radio from "../Inputs/Radio/Radio.jsx";
import CheckBox from "../Inputs/CheckBox/CheckBox.jsx";
import Search from "../Inputs/Search/Search.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import BreweryCard from "../Cards/BreweryCard/BreweryCard.jsx";
import PropTypes from "prop-types";

import BeerMap from "../BeerMap/BeerMap.jsx";

export default function BeerMapCatalog({filters = [], filterButtons = []}){
    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <div className={styles.catalogHeader}>
                    <div>
                        <h2>Карта баров</h2>
                         <div className={styles.filterButtons} style={{alignItems: "center"}}>
                             <p>Выберите тип карты:</p>
                             {filterButtons.map((button) => (
                                 <IconButton key={button.text} text={button.text}>{button.icon}</IconButton>
                             ))}
                         </div>
                    </div>
                </div>

            </div>
            <div className={styles.menuContent}>
                <div className={styles.menuFilters}>
                    {filters.map((filter) => {
                        switch (filter.type) {
                            case "combobox":
                                return <FilterComboBox key={filter.title} title={filter.title} options={filter.options} />;
                            case "radio":
                                return <Radio key={filter.title} title={filter.title} options={filter.options} />;
                            case "checkbox":
                                return <CheckBox text={filter.title}/>
                            case "search":
                                return <Search text={filter.title} options={filter.options}/>
                            default:
                                return null;
                        }
                    })}
                    <SimpleButton text="Применить фильтры"></SimpleButton>
                </div>
                <div className={styles.menuItemsSections}>
                    <div className={styles.appliedFiltersRow}>
                        <AppliedFilter>
                            <LocationIcon/>
                            <p>Нижний Новгород</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Абхазия</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Албания</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Пилэнер</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Пшеничный эль</p>
                        </AppliedFilter>
                        <AppliedFilter style="secondary">
                            <p>Сбросить фильтры</p>
                        </AppliedFilter>
                    </div>
                    <BeerMap/>

                </div>
            </div>
        </div>
    )
}

BeerMapCatalog.propTypes = {
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            type: PropTypes.string.isRequired
        })
    ),
    filterButtons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            icon: PropTypes.func.isRequired,
        })
    )
}